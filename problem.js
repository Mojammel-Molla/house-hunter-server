function isPalindrome(string) {
  const cleanedString = string.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

  return cleanedString === cleanedString.split('').reverse().join('');
}

console.log(isPalindrome('level')); // Output: true
console.log(isPalindrome('hello')); // Output: false
console.log(isPalindrome('A man, a plan, a canal: Panama')); // Output: true
