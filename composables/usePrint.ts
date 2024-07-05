import { htmlToPDF } from '#imports'

const usePrint = async (HTMLElement: HTMLElement) => {
  const pdf = await htmlToPDF(HTMLElement,
    undefined,
    {
      html2canvas: {
        scale: 0.7,
        useCORS: true
      }
    })
  const totalPages = pdf.getNumberOfPages()
  const pdfHeight = pdf.getLineHeight()
  await pdf.html('<b>I am a custom pdf!!!</b>', {
    x: 20,
    y: (pdfHeight - 50) * totalPages // place in the bottom
  })
  const blob = pdf.output('blob')
  window.open(URL.createObjectURL(blob), '_blank')
}