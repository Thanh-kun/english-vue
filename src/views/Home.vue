<script setup>
import { Button } from 'ant-design-vue'
import { SparklesIcon } from '@heroicons/vue/24/outline'
import Part from '@/components/Part.vue'
import { usePart } from '@/stores/part'
const partStore = usePart()
</script>
<template>
  <div>
    <div class="bg-primary-50 overflow-hidden">
      <div class="flex flex-wrap items-center min-h-svh container mx-auto">
        <div class="relative w-full lg:w-1/2">
          <div
            class="absolute before::content-[''] before:absolute before:animation-scene before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:shadow before:w-[200%] before:h-[200%] before:block before:bg-primary-300 before:rounded-full before:bg-opacity-50"
            id="planet-svg"
          >
            <div class="relative w-9 h-9">
              <svg
                id="Capa_1"
                enable-background="new 0 0 512 512"
                height="512"
                viewBox="0 0 512 512"
                width="512"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                class="w-full h-full"
              >
                <linearGradient
                  id="SVGID_1_"
                  gradientUnits="userSpaceOnUse"
                  x1="256"
                  x2="256"
                  y1="512"
                  y2="0"
                >
                  <stop offset="0" stop-color="#fd3a84" />
                  <stop offset="1" stop-color="#ffa68d" />
                </linearGradient>
                <g>
                  <g>
                    <path
                      d="m390 120c33.084 0 60-26.916 60-60s-26.916-60-60-60-60 26.916-60 60 26.916 60 60 60zm0-90c16.542 0 30 13.458 30 30s-13.458 30-30 30-30-13.458-30-30 13.458-30 30-30zm-14.382 240.382c0-91.189-73.796-165-165-165-21.437 0-42.246 4.072-61.556 11.829-34.16-25.332-109.954-78.37-139.969-48.355-30.01 30.01 23.117 105.97 48.407 140.068-43.423 108.618 36.577 226.457 153.118 226.458 21.429 0 42.231-4.07 61.538-11.823 34.717 25.742 110.028 78.312 139.988 48.347 30.009-30.009-22.994-105.771-48.354-139.969 7.756-19.31 11.828-40.118 11.828-61.555zm-314.267-108.281c-30.688-46.956-32.759-67.84-31.001-71.985 4.539-1.894 30.288.946 89.118 42.672-18.323 12.193-34.228 28.075-46.42 46.468-4.134-5.837-8.044-11.564-11.697-17.155zm149.267 243.281c-87.956-.001-152.167-82.599-130.897-167.879 22.718 27.986 49.134 57.182 77.864 85.912 28.76 28.76 57.988 55.202 86 77.936-10.651 2.661-21.704 4.031-32.967 4.031zm-31.82-103.18c-32.553-32.553-62.144-65.822-86.42-96.986 23.571-42.809 68.435-69.834 118.24-69.834 74.61 0 135 60.38 135 135 0 51.179-28.332 95.332-69.797 118.269-31.175-24.281-64.457-53.883-97.023-86.449zm212.087 148.448c-4.146 1.76-25.03-.314-71.985-31.001-5.582-3.648-11.3-7.551-17.126-11.677 18.115-12.055 34.093-27.886 46.439-46.441 41.726 58.832 44.565 84.584 42.672 89.119zm-345.885-28.65c-24.813 0-45 20.187-45 45s20.187 45 45 45 45-20.187 45-45-20.187-45-45-45zm0 60c-8.271 0-15-6.729-15-15s6.729-15 15-15 15 6.729 15 15-6.729 15-15 15zm422-211c-24.813 0-45 20.187-45 45s20.187 45 45 45 45-20.187 45-45-20.187-45-45-45zm0 60c-8.271 0-15-6.729-15-15s6.729-15 15-15 15 6.729 15 15-6.729 15-15 15z"
                      fill="url(#SVGID_1_)"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </div>
          <div class="absolute" id="shape1-svg">
            <div class="relative w-12 h-12">
              <svg
                id="FLATICON_FLAT"
                height="512"
                viewBox="0 0 64 64"
                width="512"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                data-name="FLATICON FLAT"
                class="w-full h-full"
              >
                <linearGradient
                  id="linear-gradient"
                  gradientUnits="userSpaceOnUse"
                  x1="4.969"
                  x2="59.035"
                  y1="32.001"
                  y2="32.001"
                >
                  <stop offset="0" stop-color="#00c0ff" />
                  <stop offset="1" stop-color="#5558ff" />
                </linearGradient>
                <path
                  d="m58.94 12.59-2.57 16.24a7.643 7.643 0 0 1 -8.23 6.47 7.43892 7.43892 0 0 1 -6.5-6.34 1.34764 1.34764 0 0 0 -1.11-1.15 1.37113 1.37113 0 0 0 -1 .24 1.29728 1.29728 0 0 0 -.53.87l-3.21 20.27a7.59094 7.59094 0 0 1 -8.05 6.5 7.40261 7.40261 0 0 1 -6.26-4.73 2.84675 2.84675 0 0 0 -5.44.65l-.4 2.5a5.43756 5.43756 0 0 1 -5.38 4.59 5.36869 5.36869 0 0 1 -1.37-.18c-2.9-.74-4.39-3.65-3.79-7.39l1.89-11.95a5.59287 5.59287 0 0 1 5.67-4.76 5.43818 5.43818 0 0 1 4.84 3.58 2.66973 2.66973 0 0 0 2.08 1.82 2.59346 2.59346 0 0 0 2.99-2.17l3.8-23.94a7.53456 7.53456 0 0 1 8.69-6.14c3.78.6 5.96 3.28 6 7.35a1.22821 1.22821 0 0 0 1.95.98 1.19591 1.19591 0 0 0 .49-.8l.73-4.57a7.61069 7.61069 0 0 1 8.31-6.47 7.41756 7.41756 0 0 1 6.4 8.53zm-5.51 36.84a5.285 5.285 0 1 0 5.28 5.28 5.2899 5.2899 0 0 0 -5.28-5.28zm-2.5-7.12a3.535 3.535 0 1 0 -3.54 3.53 3.54653 3.54653 0 0 0 3.54-3.53zm-33.93-23.22a5.285 5.285 0 1 0 -5.28-5.29 5.292 5.292 0 0 0 5.28 5.29zm-6.03 10.66a3.54 3.54 0 1 0 -3.54-3.54 3.538 3.538 0 0 0 3.54 3.54z"
                  fill="url(#linear-gradient)"
                />
              </svg>
            </div>
          </div>
          <div class="absolute" id="shape2-svg">
            <div class="relative w-8 h-8">
              <svg
                id="Capa_1"
                enable-background="new 0 0 512 512"
                height="512"
                viewBox="0 0 512 512"
                width="512"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                class="w-full h-full"
              >
                <linearGradient
                  id="SVGID_1_"
                  gradientUnits="userSpaceOnUse"
                  x1="0"
                  x2="512"
                  y1="256"
                  y2="256"
                >
                  <stop offset="0" stop-color="#80d8ff" />
                  <stop offset="1" stop-color="#ea80fc" />
                </linearGradient>
                <path
                  d="m216.667 275.328h-196.667c-11.046 0-20 8.954-20 20v196.667c0 11.046 8.954 20 20 20h196.667c11.046 0 20-8.954 20-20v-196.667c0-11.046-8.955-20-20-20zm-20 196.667h-156.667v-156.667h156.667zm197-196.667c-65.249 0-118.333 53.084-118.333 118.334 0 65.249 53.084 118.333 118.333 118.333 65.25 0 118.333-53.084 118.333-118.333 0-65.25-53.084-118.334-118.333-118.334zm0 196.667c-43.193 0-78.333-35.14-78.333-78.333s35.14-78.334 78.333-78.334 78.333 35.141 78.333 78.334-35.14 78.333-78.333 78.333zm-255.667-235.333h236c15.528 0 25.136-16.979 17.15-30.29l-118-196.667c-7.748-12.913-26.529-12.951-34.3 0l-118 196.667c-7.989 13.315 1.627 30.29 17.15 30.29zm118-177.794 82.676 137.794h-165.352z"
                  fill="url(#SVGID_1_)"
                />
              </svg>
            </div>
          </div>
          <div class="absolute" id="plus-svg">
            <div class="relative w-8 h-8">
              <svg
                id="svg5"
                height="512"
                viewBox="0 0 180.62223 180.62223"
                width="512"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns:svg="http://www.w3.org/2000/svg"
                class="w-full h-full"
              >
                <linearGradient
                  id="linearGradient21800"
                  gradientUnits="userSpaceOnUse"
                  x1="-1307.732"
                  x2="-1163.798"
                  y1="-717.124"
                  y2="-858.777"
                >
                  <stop id="stop21794" offset="0" stop-color="#ff58ae" />
                  <stop id="stop21796" offset="1" stop-color="#6a279b" />
                </linearGradient>
                <g id="layer1" transform="translate(1326.687 879.153)">
                  <path
                    id="path667"
                    d="m-1236.3771-848.84197a10.909116 10.909116 0 0 0 -10.9082 10.90844v38.18237h-38.1826a10.909116 10.909116 0 0 0 -10.9082 10.90847 10.909116 10.909116 0 0 0 10.9082 10.90984h38.1826v38.18101a10.909116 10.909116 0 0 0 10.9082 10.90987 10.909116 10.909116 0 0 0 10.9099-10.90987v-38.18101h38.181a10.909116 10.909116 0 0 0 10.9099-10.90984 10.909116 10.909116 0 0 0 -10.9099-10.90847h-38.181v-38.18237a10.909116 10.909116 0 0 0 -10.9099-10.90844z"
                    fill="url(#linearGradient21800)"
                    font-variation-settings="normal"
                    vector-effect="none"
                  />
                </g>
              </svg>
            </div>
          </div>
          <div class="relative max-w-2xl mx-auto py-32">
            <h1
              class="text-4xl font-black text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-purple-400 to-pink-600"
            >
              Practice TOEIC test
            </h1>
            <h2 class="text-center text-lg font-light mb-10">
              Our website is a reliable destination to support you in preparing for the TOEIC exam.
              We offer lessons, personalized feedback, and quality resources to help you enhance
              your skills and confidently overcome the language challenges.
            </h2>
            <div class="flex justify-center">
              <Button type="primary">
                <template #icon>
                  <SparklesIcon class="inline-block w-4 h-4 mr-2" />
                </template>
                <span>Start now!</span>
              </Button>
            </div>
          </div>
        </div>
        <div class="relative w-full lg:w-1/2">
          <div class="relative w-fit">
            <img src="../assets/images/people.webp" alt="" class="max-w-full max-h-full" />
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="container mx-auto py-28">
        <h2
          class="relative w-fit mx-auto text-4xl text-center font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-purple-400 to-pink-600 before-underline"
        >
          Study by topic
        </h2>
        <h3 class="font-light text-center mb-12">Study by different topics and test formats</h3>
        <div class="relative">
          <div
            class="absolute top-0 left-0 right-0 bottom-0 overflow-hidden -z-10 pointer-events-none"
          >
            <div class="flex h-full items-center justify-center">
              <div class="rotate-45 w-fit blur-3xl mx-auto -z-10">
                <div class="flex -mx-1">
                  <div class="px-1">
                    <div class="w-40 h-40 rounded-3xl bg-red-200"></div>
                  </div>
                  <div class="px-1">
                    <div class="w-40 h-40 rounded-3xl bg-yellow-200"></div>
                  </div>
                </div>
                <div class="flex mt-2 -mx-1">
                  <div class="px-1">
                    <div class="w-40 h-40 rounded-3xl bg-primary-200"></div>
                  </div>
                  <div class="px-1">
                    <div class="w-40 h-40 rounded-3xl bg-green-200"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-8">
            <h4 class="text-xl mb-4">Listening</h4>
            <Part :parts="partStore.listeningParts" />
          </div>
          <div>
            <h4 class="text-xl mb-4">Reading</h4>
            <Part :parts="partStore.readingParts" />
          </div>
        </div>
      </div>
    </div>
    <div class="bg-radial-gradient">
      <div class="container mx-auto py-28">
        <h2
          class="relative w-fit mx-auto before-underline text-4xl text-center font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-purple-400 to-pink-600"
        >
          Our Feature
        </h2>
        <h3 class="font-light text-center mb-12 max-w-xl mx-auto">
          Prepare for TOEIC success with our themed practice sessions and realistic exam
          simulations. Boost confidence and skills today!
        </h3>
        <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div class="flex flex-col rounded shadow-md border bg-white">
            <div class="bg-green-300 text-white py-2 px-4 rounded-t">
              <h3 class="text-base">Listening</h3>
            </div>
            <div class="flex flex-col flex-1 pt-4 pb-2 rounded-b">
              <div class="flex-1 pb-20 px-4 border-b border-gray-800 border-dashed text-justify">
                <span class="border-b border-gray-800 border-dashed">
                  Master TOEIC listening on our site with diverse, real-life audio exercises from
                  basic to advanced levels. Get detailed explanations and instant feedback for
                  immediate skill enhancement.
                </span>
              </div>
              <div class="px-4 pt-2">
                <a href="#" class="flex items-center text-sm leading-4 no-underline">
                  <SparklesIcon class="w-4 h-4 mr-2" />
                  <span>Start now!</span>
                </a>
              </div>
            </div>
          </div>
          <div class="flex flex-col rounded shadow-md border bg-white">
            <div class="bg-primary-300 text-white py-2 px-4 rounded-t">
              <h3 class="text-base">Reading</h3>
            </div>
            <div class="flex flex-col flex-1 pt-4 pb-2 rounded-b">
              <div class="flex-1 pb-20 px-4 border-b border-gray-800 border-dashed text-justify">
                <span class="border-b border-gray-800 border-dashed">
                  Our Reading section offers diverse passages, rich vocabulary, and effective
                  test-solving strategies to enhance TOEIC reading skills. Access a variety of texts
                  for an efficient preparation experience.
                </span>
              </div>
              <div class="px-4 pt-2">
                <a href="#" class="flex items-center text-sm leading-4 no-underline">
                  <SparklesIcon class="w-4 h-4 mr-2" />
                  <span>Start now!</span>
                </a>
              </div>
            </div>
          </div>
          <div class="flex flex-col rounded shadow-md border bg-white">
            <div class="bg-purple-300 text-white py-2 px-4 rounded-t">
              <h3 class="text-base">Mini Test</h3>
            </div>
            <div class="flex flex-col flex-1 pt-4 pb-2 rounded-b">
              <div class="flex-1 pb-20 px-4 border-b border-gray-800 border-dashed text-justify">
                <span class="border-b border-gray-800 border-dashed">
                  Our Mini Tests simulate TOEIC exam conditions, offering quick assessments and
                  targeted practice. Enhance your test-taking strategies and track your progress
                  efficiently with our focused mini exams
                </span>
              </div>
              <div class="px-4 pt-2">
                <a href="#" class="flex items-center text-sm leading-4 no-underline">
                  <SparklesIcon class="w-4 h-4 mr-2" />
                  <span>Start now!</span>
                </a>
              </div>
            </div>
          </div>
          <div class="flex flex-col rounded shadow-md border bg-white">
            <div class="bg-red-300 text-white py-2 px-4 rounded-t">
              <h3 class="text-base">Full Test</h3>
            </div>
            <div class="flex flex-col flex-1 pt-4 pb-2 rounded-b">
              <div class="flex-1 pb-20 px-4 border-b border-gray-800 border-dashed text-justify">
                <span class="border-b border-gray-800 border-dashed">
                  Prepare for the TOEIC exam with comprehensive full-length practice tests mirroring
                  the actual exam. Evaluate comprehensive skills and best equip yourself for the
                  certification exam.
                </span>
              </div>
              <div class="px-4 pt-2">
                <a href="#" class="flex items-center text-sm leading-4 no-underline">
                  <SparklesIcon class="w-4 h-4 mr-2" />
                  <span>Start now!</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.gradient-1 {
  /* background: radial-gradient(circle at 50% 50%, #ffffff, #e0f2fe); */
}
</style>
