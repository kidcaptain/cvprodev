<template>
  <editor-content :editor="editor" />
</template>

<script>
  import { Editor, EditorContent } from '@tiptap/vue-3'
  import StarterKit from '@tiptap/starter-kit'
  import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
  export default {
    components: {
      EditorContent,
    },

    data() {
      return {
        editor: null,
      }
    },

    mounted() {
      this.editor = new Editor({
        content: '<p></p>',
        extensions: [StarterKit, Document, Paragraph, Text],
      })
    },

    beforeUnmount() {
      this.editor.destroy()
    },
  }
</script>