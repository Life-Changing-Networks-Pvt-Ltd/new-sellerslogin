// "use client";

// import { blogAssetUrl } from "@/api/blogApi";

// type Block =
//   | { type: "image"; alt: string; src: string }
//   | { type: "paragraph"; text: string };

// const imagePattern = /^!\[(.*?)]\((.*?)\)$/;

// export function parseBlogContent(content: string): Block[] {
//   return content
//     .split(/\n{2,}/)
//     .map((block) => block.trim())
//     .filter(Boolean)
//     .map((block) => {
//       const match = block.match(imagePattern);
//       if (match?.[2]) {
//         return { type: "image", alt: match[1] || "", src: match[2] };
//       }
//       return { type: "paragraph", text: block };
//     });
// }

// export function BlogContent({ content }: { content: string }) {
//   const blocks = parseBlogContent(content);

//   if (!blocks.length) {
//     return <p className="text-slate-500">No article content yet.</p>;
//   }

//   return (
//     <div className="space-y-7 text-lg leading-8 text-slate-800">
//       {blocks.map((block, index) =>
//         block.type === "image" ? (
//           <figure key={`${block.src}-${index}`} className="overflow-hidden rounded-xl bg-white">
//             <img
//               src={blogAssetUrl(block.src)}
//               alt={block.alt}
//               className="max-h-[520px] w-full object-cover"
//             />
//             {block.alt && (
//               <figcaption className="px-4 py-3 text-sm text-slate-500">
//                 {block.alt}
//               </figcaption>
//             )}
//           </figure>
//         ) : (
//           <p key={`${block.text}-${index}`} className="whitespace-pre-wrap">
//             {block.text}
//           </p>
//         ),
//       )}
//     </div>
//   );
// }

// "use client";

// import { blogAssetUrl } from "@/api/blogApi";

// type Block =
//   | { type: "image"; alt: string; src: string }
//   | { type: "paragraph"; text: string };

// const markdownImagePattern = /^!\[([^\]]*)\]\(([^)]+)\)$/;

// const imageUrlPattern =
//   /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|avif)(\?.*)?$/i;

// export function parseBlogContent(content: string): Block[] {
//   return content
//     .split(/\n{2,}/)
//     .map((block) => block.trim())
//     .filter(Boolean)
//     .map((block) => {
//       // Markdown image:
//       // ![Alt text](https://example.com/image.jpg)
//       const markdownMatch = block.match(markdownImagePattern);

//       if (markdownMatch?.[2]) {
//         return {
//           type: "image",
//           alt: markdownMatch[1] || "",
//           src: markdownMatch[2],
//         };
//       }

//       // Plain image URL:
//       // https://example.com/image.jpg
//       if (imageUrlPattern.test(block)) {
//         return {
//           type: "image",
//           alt: "",
//           src: block,
//         };
//       }

//       return {
//         type: "paragraph",
//         text: block,
//       };
//     });
// }

// export function BlogContent({ content }: { content: string }) {
//   const blocks = parseBlogContent(content);

//   if (!blocks.length) {
//     return <p className="text-slate-500">No article content yet.</p>;
//   }

//   return (
//     <div className="space-y-7 text-lg leading-8 text-slate-800">
//       {blocks.map((block, index) =>
//         block.type === "image" ? (
//           <figure
//             key={`${block.src}-${index}`}
//             className="overflow-hidden rounded-xl bg-white"
//           >
//             <img
//               src={blogAssetUrl(block.src)}
//               alt={block.alt}
//               className="max-h-[520px] w-full object-cover"
//             />

//             {block.alt && (
//               <figcaption className="px-4 py-3 text-sm text-slate-500">
//                 {block.alt}
//               </figcaption>
//             )}
//           </figure>
//         ) : (
//           <p
//             key={`${block.text}-${index}`}
//             className="whitespace-pre-wrap"
//           >
//             {block.text}
//           </p>
//         ),
//       )}
//     </div>
//   );
// }



"use client";

import { blogAssetUrl } from "@/api/blogApi";

type Block =
  | {
      type: "image";
      alt: string;
      src: string;
    }
  | {
      type: "paragraph";
      text: string;
    };

/**
 * Matches:
 *
 * ![Alt text](https://example.com/image.webp)
 */
const markdownImagePattern =
  /^!\[([^\]]*)\]\(([^)]+)\)$/;

/**
 * Matches a standalone image URL.
 *
 * This is useful for older posts where the editor
 * stored the image URL as plain text.
 */
const imageUrlPattern =
  /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|avif)(\?.*)?$/i;

/**
 * Also supports relative image paths such as:
 *
 * /uploads/blog/image.webp
 */
const relativeImagePattern =
  /^\/.+\.(jpg|jpeg|png|gif|webp|avif)(\?.*)?$/i;

export function parseBlogContent(
  content: string,
): Block[] {
  if (!content?.trim()) {
    return [];
  }

  return content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      /**
       * Markdown image:
       *
       * ![Alt text](image-url)
       */
      const markdownMatch =
        block.match(markdownImagePattern);

      if (markdownMatch?.[2]) {
        return {
          type: "image",
          alt: markdownMatch[1] || "",
          src: markdownMatch[2],
        };
      }

      /**
       * Standalone absolute image URL.
       */
      if (imageUrlPattern.test(block)) {
        return {
          type: "image",
          alt: "",
          src: block,
        };
      }

      /**
       * Standalone relative image URL.
       */
      if (relativeImagePattern.test(block)) {
        return {
          type: "image",
          alt: "",
          src: block,
        };
      }

      /**
       * Everything else is normal paragraph text.
       */
      return {
        type: "paragraph",
        text: block,
      };
    });
}

export function BlogContent({
  content,
}: {
  content: string;
}) {
  const blocks = parseBlogContent(content);

  if (!blocks.length) {
    return (
      <p className="text-slate-500">
        No article content yet.
      </p>
    );
  }

  return (
    <div className="space-y-7 text-lg leading-8 text-slate-800">
      {blocks.map((block, index) => {
        if (block.type === "image") {
          return (
            <figure
              key={`${block.src}-${index}`}
              className="overflow-hidden rounded-xl bg-white"
            >
              <img
                src={blogAssetUrl(block.src)}
                alt={block.alt}
                loading="lazy"
                className="max-h-[520px] w-full object-cover"
              />

              {block.alt && (
                <figcaption className="px-4 py-3 text-sm text-slate-500">
                  {block.alt}
                </figcaption>
              )}
            </figure>
          );
        }

        return (
          <p
            key={`${block.text}-${index}`}
            className="whitespace-pre-wrap"
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
}