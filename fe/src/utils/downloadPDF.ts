export const downloadPDF = (pathname: string) => {
  const d = new Date();
  const version = d.getDate().toString().concat(".", d.getHours().toString());
  window.open(`https://cdn.afetbilgi.com/pdfs${pathname === '/' ? '/AfetBilgi' : decodeURI(pathname)}.pdf?v=${version}`, '_blank');
};
