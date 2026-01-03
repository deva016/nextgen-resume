import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { WandSparklesIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { enhanceContent } from "./actions";

interface EnhanceTextButtonProps {
  text: string;
  onEnhanced: (text: string) => void;
  disabled?: boolean;
}

export default function EnhanceTextButton({
  text,
  onEnhanced,
  disabled,
}: EnhanceTextButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  async function handleEnhance() {
    if (!text.trim()) {
      return;
    }

    setIsLoading(true);
    try {
      const enhancedText = await enhanceContent(text);
      onEnhanced(enhancedText);
      toast({
        description: "Text enhanced successfully!",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      type="button"
      onClick={handleEnhance}
      disabled={isLoading || disabled || !text.trim()}
      title="Enhance with AI"
    >
      {isLoading ? (
        <Loader2Icon className="size-4 animate-spin" />
      ) : (
        <WandSparklesIcon className="size-4 text-purple-500" />
      )}
      <span className="ml-2 sr-only">Enhance</span>
    </Button>
  );
}
