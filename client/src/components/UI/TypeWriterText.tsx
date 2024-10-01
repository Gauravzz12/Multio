"use client";
import React from "react";
import { TypewriterEffectSmooth } from "./Typewriter";
export function TypeWriterText({text,color}) {
const Words=text.split(' ');
const words: { text: string }[] = [];
for (let i = 0; i < Words.length; i++) {
  words.push({ text: `${Words[i]}` });
}


  return (
    <div className={`flex ${color} font-bold italic font-reggae-one `}>
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}
