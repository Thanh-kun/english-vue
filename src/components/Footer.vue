<script setup>
import LogoFrame from '@/components/Logo/LogoFrame.vue'
import {
  FacebookOutlined,
  RedditOutlined,
  TwitterOutlined,
  YoutubeOutlined
} from '@ant-design/icons-vue'
</script>
<template>
  <footer>
    <div class="bg-gray-800">
      <div class="container mx-auto flex py-12 flex-wrap">
        <div class="w-full lg:w-1/3">
          <div class="h-20 lg:w-fit mb-10">
            <a href="#">
              <LogoFrame />
            </a>
          </div>
        </div>
        <div class="w-full lg:w-2/3">
          <div class="flex flex-wrap">
            <div class="w-full sm:w-1/3">
              <h4 class="text-white mb-3">About us</h4>
              <ul>
                <li class="text-sm mb-1">
                  <a
                    href="#"
                    class="text-white no-underline hover:text-gray-200 transition-colors duration-300"
                  >
                    About us
                  </a>
                </li>
                <li class="text-sm mb-1">
                  <a
                    href="#"
                    class="text-white no-underline hover:text-gray-200 transition-colors duration-300"
                  >
                    Contact
                  </a>
                </li>
                <li class="text-sm mb-1">
                  <a
                    href="#"
                    class="text-white no-underline hover:text-gray-200 transition-colors duration-300"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div class="w-full sm:w-1/3">
              <h4 class="text-white mb-3">Feature</h4>
              <ul>
                <li class="text-sm mb-1">
                  <a
                    href="#"
                    class="text-white no-underline hover:text-gray-200 transition-colors duration-300"
                  >
                    Listening
                  </a>
                </li>
                <li class="text-sm mb-1">
                  <a
                    href="#"
                    class="text-white no-underline hover:text-gray-200 transition-colors duration-300"
                  >
                    Reading
                  </a>
                </li>
                <li class="text-sm mb-1">
                  <a
                    href="#"
                    class="text-white no-underline hover:text-gray-200 transition-colors duration-300"
                  >
                    Mini test
                  </a>
                </li>
                <li class="text-sm mb-1">
                  <a
                    href="#"
                    class="text-white no-underline hover:text-gray-200 transition-colors duration-300"
                  >
                    Full test
                  </a>
                </li>
              </ul>
            </div>
            <div class="w-full sm:w-1/3">
              <h4 class="text-white mb-3">Follow Us</h4>
              <ul class="flex flex-wrap gap-2">
                <li>
                  <a
                    href="#"
                    class="flex justify-center items-center w-10 h-10 rounded-full border text-primary-600 bg-transparent border-primary-600 transition-colors duration-300 hover:text-primary-400 hover:border-primary-400"
                    title="Twitter"
                  >
                    <TwitterOutlined class="text-lg" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="flex justify-center items-center w-10 h-10 rounded-full border text-red-600 bg-transparent border-red-600 transition-colors duration-300 hover:text-red-400 hover:border-red-400"
                    title="Youtube"
                  >
                    <YoutubeOutlined class="text-lg" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="flex justify-center items-center w-10 h-10 rounded-full border text-yellow-600 bg-transparent border-yellow-600 transition-colors duration-300 hover:text-yellow-400 hover:border-yellow-400"
                    title="Reddit"
                  >
                    <RedditOutlined class="text-lg" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="flex justify-center items-center w-10 h-10 rounded-full border text-primary-600 bg-transparent border-primary-600 transition-colors duration-300 hover:text-primary-400 hover:border-primary-400"
                    title="Facebook"
                  >
                    <FacebookOutlined class="text-lg" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="border-t py-2 text-white leading-4 text-sm">
        <div class="container mx-auto flex justify-between">
          <div class="font-extralight text-xs">© 2024 Prepify</div>
          <div class="flex gap-4">
            <a href="#" class="text-white hover:text-gray-300 transition-colors duration-300"
              >Term</a
            >
            <a href="#" class="text-white hover:text-gray-300 transition-colors duration-300"
              >Privacy Policy</a
            >
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
