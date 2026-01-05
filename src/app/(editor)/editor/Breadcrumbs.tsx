import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { steps } from "./steps";
import React from "react";

interface BreadcrumbsProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
}

export default function Breadcrumbs({
  currentStep,
  setCurrentStep,
}: BreadcrumbsProps) {
  return (
    <div className="flex justify-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-xl">
        <Breadcrumb>
          <BreadcrumbList>
            {steps.map((step) => (
              <React.Fragment key={step.key}>
                <BreadcrumbItem>
                  {step.key === currentStep ? (
                    <BreadcrumbPage className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text font-semibold text-transparent">
                      {step.title}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <button 
                        onClick={() => setCurrentStep(step.key)}
                        className="text-gray-400 transition-colors hover:text-white"
                      >
                        {step.title}
                      </button>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-gray-600 last:hidden" />
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
