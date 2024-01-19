<script setup>
import Part from '@/components/Part.vue'
import { usePart } from '@/stores/part'
const partStore = usePart()
</script>
<template>
  <div style="min-height: calc(100dvh - 60px)" class="bg-primary-50 py-10">
    <div class="w-full container mx-auto">
      <div class="bg-white py-8 px-8 rounded-3xl mb-8">
        <h1 class="text-2xl text-center mb-8">The TOEIC exam preparation - Listening</h1>
        <Part :parts="partStore.listeningParts" />
      </div>
      <div class="bg-white py-8 px-4 rounded-3xl mb-16 text-justify">
        <h2 class="text-xl font-bold mb-4 text-center">Introduction to TOEIC test</h2>
        <h3 class="text-lg font-bold mb-1">Listening</h3>
        <p class="mb-5 indent-8">
          The TOEIC Listening test is a crucial component of the TOEIC exam, focusing on one's
          ability to listen and comprehend messages in English across various situations. The test
          typically includes both short and long audio clips, simulating everyday communication
          scenarios in a work environment. Test-takers listen to conversations, announcements,
          discussions, and must answer corresponding questions. Common question formats in the
          Listening section include completing blanks, choosing the correct answer to questions, and
          identifying specific information in the audio clips. Practice involves listening to audio
          passages and answering questions to enhance listening skills and become familiar with the
          test format.
        </p>
        <h3 class="text-lg font-bold mb-1">TOEIC test structure</h3>
        <p class="mb-3">
          The TOEIC test consists of two main sections: Listening and Reading. Here's a detailed
          breakdown of each part:
        </p>
        <div class="mb-3">
          <p class="font-bold pl-4 mb-2">1. Listening Section</p>
          <ul class="pl-12 list-disc space-y-1">
            <li>
              <i>Part 1: Photographs with Questions</i> - Test-takers listen to descriptions of
              photographs and select the correct answer.
            </li>
            <li>
              <i>Part 2: Question-Response</i> - Short questions based on brief conversations.
            </li>
            <li>
              <i>Part 3: Short Conversations </i> - Listening to short dialogues and answering
              questions.
            </li>
            <li>
              <i>Part 4: Talks</i> - Longer speeches or talks, often announcements or short
              lectures, followed by questions.
            </li>
          </ul>
        </div>
        <div class="mb-3">
          <p class="font-bold pl-4 mb-2">2. Reading Section</p>
          <ul class="pl-12 list-disc space-y-1">
            <li>
              <i>Part 5: Incomplete Sentences</i> - Completing sentences with missing words or
              phrases.
            </li>
            <li>
              <i>Part 6: Text Completion</i> - Short passages with blanks to fill in with
              appropriate words or phrases.
            </li>
            <li><i>Part 7: Reading Comprehension </i> - Longer passages followed by questions.</li>
          </ul>
        </div>
        <p>
          The TOEIC test comprises a total of 200 questions, and the duration is approximately 2
          hours and 30 minutes. Both the Listening and Reading sections are audio-based and follow
          instructions provided in the test.
        </p>
      </div>
    </div>
  </div>
</template>
