"""Make the responsive versions of one image for the site.

Writes assets/img/<key>-<width>.<format> for each width and records the image
in src/images.json (sizes plus a tiny blurred preview shown while it loads).
The templates read that file to build srcset attributes.

Usage, from the repository root (needs Pillow 11.3+, and cwebp for WebP):
  python3 scripts/images.py <source image> <key> --widths 800,1200,1600
  python3 scripts/images.py <source image> <key> --widths 400,600 --format webp --quality 74
  python3 scripts/images.py <screenshot.png> <key> --widths 800,1200 --format webp --lossless

<key> is the path under assets/img without a width or extension, for example
art/greatwave-wide. Start from the largest, best-quality source you have; a
width larger than the source is capped at the source width. If the source is
already in the output format and at the largest width, it is copied untouched.

Format guide: AVIF suits photos (about 60% smaller than before at the same
look). Paintings keep WebP: their brushwork and paper grain need about as many
bytes in AVIF to stay as crisp, and AVIF smooths them at lower settings.
Screenshots of terminals and flat interfaces use lossless WebP: their text
stays exact, and the files are usually smaller than lossy ones.
"""
import argparse
import base64
import io
import json
import os
import shutil
import subprocess
import tempfile

from PIL import Image, ImageFilter

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
MANIFEST = os.path.join(ROOT, "src", "images.json")

# AVIF quality 72 matched the previous photos at 3x zoom on a Retina screen.
QUALITY = {"avif": 72, "webp": 74}


def save(img, path, fmt, quality, lossless=False):
    if fmt == "avif":
        img.save(path, "AVIF", quality=quality, speed=4)
        return
    # cwebp's sharp YUV conversion keeps thin coloured lines crisp. Lossless
    # suits screenshots of text and flat UI: exact, and often smaller.
    mode = ["-lossless", "-z", "9"] if lossless else ["-q", str(quality), "-m", "6", "-sharp_yuv"]
    with tempfile.NamedTemporaryFile(suffix=".png") as tmp:
        img.save(tmp.name)
        subprocess.run(["cwebp", "-quiet", *mode, "-metadata", "none", tmp.name, "-o", path], check=True)


def preview(img):
    """A ~24px wide, softened WebP as a data URI (a few hundred bytes)."""
    small = img.convert("RGB")
    small.thumbnail((24, 24 * img.height // img.width + 1), Image.LANCZOS)
    small = small.filter(ImageFilter.GaussianBlur(0.6))
    buf = io.BytesIO()
    small.save(buf, "WEBP", quality=45, method=6)
    return "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode()


def main():
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("source")
    parser.add_argument("key")
    parser.add_argument("--widths", required=True, help="comma-separated, e.g. 800,1200,1600")
    parser.add_argument("--format", choices=["avif", "webp"], default="avif")
    parser.add_argument("--quality", type=int)
    parser.add_argument("--lossless", action="store_true", help="lossless WebP, for screenshots of text")
    args = parser.parse_args()
    if args.lossless and args.format != "webp":
        parser.error("--lossless needs --format webp")
    quality = args.quality or QUALITY[args.format]

    src = Image.open(args.source)
    src.load()
    source_format = (src.format or "").lower()
    has_alpha = src.mode in ("RGBA", "LA") or "transparency" in src.info
    src = src.convert("RGBA" if has_alpha else "RGB")

    widths = sorted({min(int(w), src.width) for w in args.widths.split(",")})
    out_dir = os.path.join(ROOT, "assets", "img", os.path.dirname(args.key))
    os.makedirs(out_dir, exist_ok=True)

    for w in widths:
        h = round(src.height * w / src.width)
        path = os.path.join(ROOT, "assets", "img", f"{args.key}-{w}.{args.format}")
        if w == src.width and source_format == args.format:
            shutil.copyfile(args.source, path)  # no second round of compression
        else:
            save(src if w == src.width else src.resize((w, h), Image.LANCZOS), path, args.format, quality, args.lossless)
        print(f"  {os.path.relpath(path, ROOT):48s} {w}x{h}  {os.path.getsize(path) / 1024:6.1f} KB")

    manifest = {}
    if os.path.exists(MANIFEST):
        with open(MANIFEST) as f:
            manifest = json.load(f)
    largest = widths[-1]
    manifest[args.key] = {
        "format": args.format,
        "width": largest,
        "height": round(src.height * largest / src.width),
        "widths": widths,
        # Transparent images would show the preview around their edges.
        "preview": None if has_alpha else preview(src),
    }
    with open(MANIFEST, "w") as f:
        json.dump(dict(sorted(manifest.items())), f, indent=2)
        f.write("\n")


if __name__ == "__main__":
    main()
