export const downloadPDF = (lang: string) => {
  // const d = new Date();
  // const version = d.getDate().toString().concat(".", d.getHours().toString());
  // window.open(`https://cdn.afetbilgi.com/pdfs${pathname === '/' ? '/AfetBilgi' : decodeURI(pathname)}.pdf?v=${version}`, '_blank');

  const d = new Date();
  const version = d.getDate().toString().concat(".", d.getHours().toString(), d.getMinutes().toString());

  // TODO: Replace this with pdf.afetbilgi.com
  window.open(`https://cdn.afetbilgi.com/md-pdf/${lang}/afetbilgi.pdf?v=${version}`, '_blank');
};
