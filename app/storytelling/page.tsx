"use client";
import secondSection from "./partials/second";
import {FrequencyCircle} from "@/components/FrequencyCircle";
export default function StorytellingPage() {
  return (
    <>
      {secondSection()}
      <FrequencyCircle />
    </>
  );
}
