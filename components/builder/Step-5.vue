<script setup lang="ts">
import { Download, ArrowLeft, Share2 } from 'lucide-vue-next'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '~/components/ui/input';


</script>


<template>
    <iframe src="" class="aspect-[210/297] border w-full " frameborder="0"></iframe>
    <div class="flex flex-col sm:flex-row gap-5 justify-between mt-5">
        <div class="flex flex-1 gap-4 justify-between" >
            <nuxt-link  :to="{ name: `app-cv-builder-step-id`, params: { id: ($route.params.id - 1) }, query: { template_id: $route.query.template_id } }" >
                <Button variant="outline" type="button" class="  px-8 space-x-4" title="share">
                    <ArrowLeft />
                    <span>Previous</span>
                </Button>
            </nuxt-link>
            <Button variant="outline">
                <Share2 />
            </Button>
        </div>
        <Button type="submit" class=" px-12 space-x-4">
            <Download />
            <span>Download</span>
        </Button>
    </div>
</template>