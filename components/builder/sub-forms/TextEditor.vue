<style>
.editor {
  min-height: 300px;
  width: 100%;
  border: 1px solid black;
}
.editor-commands a{
    background-color: white;
    border: 1px solid silver;
    padding: 8px;
}
</style>
<script setup>
onMounted(() => {
  var commandButtons = document.querySelectorAll(".editor-commands a");
  for (var i = 0; i < commandButtons.length; i++) {
    commandButtons[i].addEventListener("mousedown", function (e) {
      e.preventDefault();
      var commandName = e.target.getAttribute("data-command");
      if (commandName === "html") {
        var commandArgument = e.target.getAttribute("data-command-argument");
        document.execCommand("formatBlock", false, commandArgument);
      } else {
        document.execCommand(commandName, false);
      }
      document.querySelector('.editor').focus()
    });
  }
});
</script>

<template>
  <div class="editor-commands">
    <ul class="flex gap-5 flex-wrap">
      <li><a data-command="undo">Undo</a></li>
      <li><a data-command="redo">Redo</a></li>
      <li><a data-command="insertHorizontalRule">hr</a></li>
      <li><a data-command="bold">Bold</a></li>
      <li><a data-command="italic">Italic</a></li>
      <li><a data-command="underline">Underline</a></li>
      <li><a data-command="strikeThrough">strikeThrough</a></li>
      <li><a data-command="justifyLeft">justifyLeft</a></li>
      <li><a data-command="justifyCenter">justifyCenter</a></li>
      <li><a data-command="justifyRight">justifyRight</a></li>
      <li><a data-command="justifyFull">justifyFull</a></li>
      <!-- <li><a data-command="indent">indent</a></li>
      <li><a data-command="outdent">outdent</a></li>
      <li><a data-command="subscript">subscript</a></li>
      <li><a data-command="superscript">superscript</a></li> -->
    </ul>
  </div>
  <div class="editor mt-8"  contenteditable="true"></div>
</template>
