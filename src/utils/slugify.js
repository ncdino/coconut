// utils/slugify.js
export const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')           // 공백을 하이픈으로 변환
      .replace(/[^\w\-]+/g, '')       // 특수문자 제거
      .replace(/\-\-+/g, '-')         // 중복된 하이픈 제거
      .replace(/^-+/, '')             // 앞쪽 하이픈 제거
      .replace(/-+$/, '');            // 뒤쪽 하이픈 제거
  };
  