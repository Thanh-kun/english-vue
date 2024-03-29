<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <div style="min-height: calc(100dvh - 60px)" class="bg-primary-50 py-10">
    <div class="w-full container mx-auto">
      <div class="bg-white p-8 rounded-3xl mb-6">
        <h1 class="text-2xl text-center mb-8">Test</h1>
        <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <RouterLink
            to="/mini-test"
            class="shadow border rounded-3xl text-black no-underline group/card bg-white transition-shadow duration-300 hover:text-black hover:shadow-md"
          >
            <div class="h-48 overflow-hidden rounded-t-3xl">
              <img
                src="@/assets/images/image8.webp"
                class="h-48 w-full object-cover rounded-t-3xl transition-all duration-300 group-hover/card:scale-110"
                loading="lazy"
              />
            </div>
            <div class="p-4">
              <h3 class="text-xl font-bold">Mini test</h3>
              <h4 class="text-lg font-bold mb-2">~30 questions</h4>
              <p
                class="line-clamp-4"
                title="The TOEIC mini test gauges language skills briefly, assessing listening and reading proficiency in workplace scenarios through concise audio and text prompts."
              >
                The TOEIC mini test gauges language skills briefly, assessing listening and reading
                proficiency in workplace scenarios through concise audio and text prompts.
              </p>
            </div>
          </RouterLink>
          <RouterLink
            to="/full-test"
            class="shadow border rounded-3xl text-black no-underline group/card bg-white transition-shadow duration-300 hover:text-black hover:shadow-md"
          >
            <div class="h-48 overflow-hidden rounded-t-3xl">
              <img
                src="@/assets/images/image9.webp"
                class="h-48 w-full object-cover rounded-t-3xl transition-all duration-300 group-hover/card:scale-110"
                loading="lazy"
              />
            </div>
            <div class="p-4">
              <h3 class="text-xl font-bold">Full Test</h3>
              <h4 class="text-lg font-bold mb-2">~100 questions</h4>
              <p
                class="line-clamp-4"
                title="The TOEIC test assesses listening through audio prompts and evaluates reading comprehension via written passages, testing English proficiency for workplace contexts."
              >
                The TOEIC test assesses listening through audio prompts and evaluates reading
                comprehension via written passages, testing English proficiency for workplace
                contexts.
              </p>
            </div>
          </RouterLink>
        </div>
      </div>
      <div class="bg-white p-8 rounded-3xl mb-16 text-justify">
        <h2 class="text-xl font-bold mb-4 text-center">Introduction to TOEIC test</h2>
        <h3 class="text-lg font-bold mb-1">Mini test</h3>
        <p class="mb-5 indent-8">
          A mini TOEIC test typically consists of short questions assessing grammar, vocabulary, and
          familiarity with English used in workplace settings. The tests often focus on listening
          and reading, requiring test-takers to comprehend short conversations or passages and
          answer related questions. Scores are usually evaluated based on language proficiency,
          basic understanding, and communication abilities in an international work environment.
        </p>
        <h3 class="text-lg font-bold mb-1">Full test</h3>
        <p class="mb-1 indent-8">
          The full TOEIC test is a comprehensive assessment evaluating a candidate's proficiency in
          English language skills across listening and reading. It comprises various sections,
          starting with the Listening section, which involves listening to a range of recorded
          materials such as conversations, talks, and announcements. Test-takers then respond to
          questions related to these audio segments.
        </p>
        <p class="mb-1 indent-8">
          The Reading section assesses comprehension abilities through passages covering diverse
          topics. Candidates answer questions based on these texts, demonstrating their
          understanding of the information presented.
        </p>
        <p class="mb-5 indent-8">
          The TOEIC test aims to gauge one's grasp of English in professional and everyday contexts,
          assessing vocabulary, grammar, and the ability to comprehend and communicate effectively.
          Scores are calculated based on correct responses, reflecting the individual's language
          proficiency and readiness for international work environments.
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
