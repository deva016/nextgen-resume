"use client";

import LoadingButton from "@/components/LoadingButton";
import ResumePreview from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { ResumeServerData } from "@/lib/types";
import { mapToResumeValues } from "@/lib/utils";
import { formatDate } from "date-fns";
import { MoreVertical, Printer, Trash2, BarChart3 } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useTransition } from "react";
import { useReactToPrint } from "react-to-print";
import { deleteResume } from "./actions";

interface ResumeItemProps {
  resume: ResumeServerData;
}

export default function ResumeItem({ resume }: ResumeItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: resume.title || "Resume",
  });

  const wasUpdated = resume.updatedAt !== resume.createdAt;

  return (
    <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all hover:border-purple-500/50 hover:bg-white/10">
      <div className="space-y-3">
        <Link
          href={`/editor?resumeId=${resume.id}`}
          className="inline-block w-full text-center"
        >
          <p className="line-clamp-1 font-semibold text-white">
            {resume.title || "Untitled Resume"}
          </p>
          {resume.description && (
            <p className="line-clamp-2 text-sm text-gray-400">{resume.description}</p>
          )}
          <p className="text-xs text-gray-500">
            {wasUpdated ? "Updated" : "Created"} on{" "}
            {formatDate(resume.updatedAt, "MMM d, yyyy h:mm a")}
          </p>
        </Link>
        <Link
          href={`/editor?resumeId=${resume.id}`}
          className="relative inline-block w-full"
        >
          <ResumePreview
            resumeData={mapToResumeValues(resume)}
            contentRef={contentRef}
            className="overflow-hidden rounded-lg shadow-sm transition-shadow group-hover:shadow-lg group-hover:shadow-purple-500/10"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
        </Link>
      </div>
      <MoreMenu resumeId={resume.id} onPrintClick={reactToPrintFn} />
    </div>
  );
}

interface MoreMenuProps {
  resumeId: string;
  onPrintClick: () => void;
}

function MoreMenu({ resumeId, onPrintClick }: MoreMenuProps) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 opacity-0 transition-opacity group-hover:opacity-100 text-gray-400 hover:text-white hover:bg-white/10"
          >
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-white/10 bg-[#1a1a2f] text-white">
          <DropdownMenuItem className="flex items-center gap-2 focus:bg-white/10" asChild>
            <Link href={`/resumes/${resumeId}/ats`}>
              <BarChart3 className="size-4" />
              Check ATS Score
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2 focus:bg-white/10"
            onClick={onPrintClick}
          >
            <Printer className="size-4" />
            Print / Export PDF
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2 text-red-400 focus:text-red-400 focus:bg-red-500/10"
            onClick={() => setShowDeleteConfirmation(true)}
          >
            <Trash2 className="size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteConfirmationDialog
        resumeId={resumeId}
        open={showDeleteConfirmation}
        onOpenChange={setShowDeleteConfirmation}
      />
    </>
  );
}

interface DeleteConfirmationDialogProps {
  resumeId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DeleteConfirmationDialog({
  resumeId,
  open,
  onOpenChange,
}: DeleteConfirmationDialogProps) {
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  async function handleDelete() {
    startTransition(async () => {
      try {
        await deleteResume(resumeId);
        onOpenChange(false);
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          description: "Something went wrong. Please try again.",
        });
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/10 bg-[#1a1a2f] text-white">
        <DialogHeader>
          <DialogTitle>Delete resume?</DialogTitle>
          <DialogDescription className="text-gray-400">
            This will permanently delete this resume. This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <LoadingButton
            variant="destructive"
            onClick={handleDelete}
            loading={isPending}
          >
            Delete
          </LoadingButton>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-white/20 bg-white/5 hover:bg-white/10 text-white"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
