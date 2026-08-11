"use client";

import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
import { BlogPost, blogAssetUrl, uploadBlogImage } from "@/api/blogApi";
import { BlogContent } from "@/components/blog/BlogContent";

const MAX_IMAGE_BYTES = 100 * 1024;
const IMAGE_QUALITY_STEPS = [0.82, 0.72, 0.62, 0.52, 0.42, 0.34, 0.28];

const fileToImage = (file: File) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read image."));
    };
    image.src = url;
  });

const canvasToBlob = (canvas: HTMLCanvasElement, quality: number) =>
  new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", quality));

async function compressImageBelow100kb(file: File) {
  if (!file.type.startsWith("image/")) throw new Error("Only image files are allowed.");
  if (file.size <= MAX_IMAGE_BYTES) return file;

  const image = await fileToImage(file);
  let width = image.naturalWidth;
  let height = image.naturalHeight;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Image compression is not available in this browser.");

  for (let scale = 1; scale >= 0.35; scale -= 0.12) {
    width = Math.max(480, Math.round(image.naturalWidth * scale));
    height = Math.max(320, Math.round(image.naturalHeight * scale));
    canvas.width = width;
    canvas.height = height;
    context.clearRect(0, 0, width, height);
    context.drawImage(image, 0, 0, width, height);

    for (const quality of IMAGE_QUALITY_STEPS) {
      const blob = await canvasToBlob(canvas, quality);
      if (blob && blob.size <= MAX_IMAGE_BYTES) {
        return new File([blob], file.name.replace(/\.[^.]+$/, ".webp"), {
          type: "image/webp",
        });
      }
    }
  }

  throw new Error("Image must be below 100 KB. Try a smaller image.");
}

export function BlogForm({
  post,
  onSubmit,
}: {
  post?: BlogPost;
  onSubmit: (data: FormData) => Promise<void>;
}) {
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [processingImage, setProcessingImage] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState(post?.title || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [content, setContent] = useState(post?.content || "");
  const [published, setPublished] = useState(post?.published ?? true);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState(post?.image || "");
  const [showPreview, setShowPreview] = useState(false);

  const previewTitle = title.trim() || "Untitled post";
  const previewExcerpt = excerpt.trim();
  const readingMinutes = useMemo(
    () => Math.max(1, Math.ceil(content.split(/\s+/).filter(Boolean).length / 180)),
    [content],
  );

  const selectCoverImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setProcessingImage(true);
    setError("");

    try {
      const compressed = await compressImageBelow100kb(file);
      setCoverFile(compressed);
      setCoverPreview(URL.createObjectURL(compressed));
    } catch (err: unknown) {
      setCoverFile(null);
      if (coverInputRef.current) coverInputRef.current.value = "";
      setError(err instanceof Error ? err.message : "Could not prepare cover image.");
    } finally {
      setProcessingImage(false);
    }
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const data = new FormData();
      data.set("title", title);
      data.set("excerpt", excerpt);
      data.set("content", content);
      if (published) data.set("published", "true");
      else data.set("published", "false");
      if (coverFile) data.set("image", coverFile);
      await onSubmit(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not save post.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="mx-auto grid max-w-4xl gap-4 p-6">
      <input
        name="title"
        required
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Title"
        className="rounded border p-3"
      />
      <textarea
        name="excerpt"
        value={excerpt}
        onChange={(event) => setExcerpt(event.target.value)}
        placeholder="Short excerpt"
        className="min-h-24 rounded border p-3"
      />
      <textarea
        ref={contentRef}
        name="content"
        required
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Write your article..."
        className="min-h-72 rounded border p-3"
      />
      <label className="text-sm">
        Cover image
        <input
          ref={coverInputRef}
          name="image"
          type="file"
          accept="image/*"
          className="ml-2"
          onChange={(event) => void selectCoverImage(event)}
        />
      </label>
      <p className="text-sm text-slate-500">
        Images are auto-compressed to WebP and must be 100 KB or smaller.
      </p>
      <label className="text-sm">
        <input
          name="published"
          type="checkbox"
          value="true"
          checked={published}
          onChange={(event) => setPublished(event.target.checked)}
          className="mr-2"
        />
        Publish now
      </label>
      {error && <p className="text-red-700">{error}</p>}

      <div className="flex flex-wrap gap-3 border-t pt-4">
        <button
          type="button"
          onClick={() => setShowPreview((value) => !value)}
          className="rounded border border-[#0f5132] px-5 py-3 text-[#0f5132]"
        >
          {showPreview ? "Hide preview" : "Preview article"}
        </button>
        <button
          disabled={saving || processingImage}
          className="rounded bg-[#0f5132] px-5 py-3 text-white disabled:opacity-60"
        >
          {saving ? "Saving..." : processingImage ? "Processing image..." : "Save post"}
        </button>
      </div>

      {showPreview && (
        <article className="mt-4 rounded border bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#0f5132]">
            Full article preview
          </p>
          <p className="mt-6 text-sm text-slate-500">{readingMinutes} min read</p>
          <h2 className="mt-2 text-4xl font-bold text-slate-900">{previewTitle}</h2>
          {previewExcerpt && <p className="mt-4 text-xl text-slate-600">{previewExcerpt}</p>}
          {coverPreview && (
            <img
              src={coverPreview.startsWith("blob:") ? coverPreview : blogAssetUrl(coverPreview)}
              alt={previewTitle}
              className="my-8 max-h-96 w-full rounded-xl object-cover"
            />
          )}
          <BlogContent content={content} />
        </article>
      )}
    </form>
  );
}
