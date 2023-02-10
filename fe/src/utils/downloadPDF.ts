export const downloadPDF = (pathname: string) => {
  window.open(`https://cdn.afetbilgi.com/pdfs${pathname === '/' ? '/AfetBilgi' : decodeURI(pathname)}.pdf`, '_blank');
};
