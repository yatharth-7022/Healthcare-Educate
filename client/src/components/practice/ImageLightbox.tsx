import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { MathText } from "./MathText";

type ImageLightboxProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  src: string;
  alt: string;
  caption?: string;
};

/** Full-size view of a question/solution image, opened when the image is clicked. */
export function ImageLightbox({ open, onOpenChange, src, alt, caption }: ImageLightboxProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full p-4">
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <img
          src={src}
          alt={alt}
          className="w-full max-h-[80vh] object-contain bg-white rounded-md"
          draggable={false}
          onContextMenu={(event) => event.preventDefault()}
        />
        {caption && (
          <p className="text-sm text-muted-foreground text-center mt-2">
            <MathText text={caption} />
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
