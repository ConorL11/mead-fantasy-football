function FormatNumber({ number }) {
    const suffixes = ["", "k", "M", "B", "T"];
  
    let suffixIndex = 0;
    while (number >= 1000 && suffixIndex < suffixes.length - 1) {
      number /= 1000;
      suffixIndex++;
    }
  
    const formattedNumber = number.toFixed(1).replace(/\.0$/, '') + suffixes[suffixIndex];

    return(
        <span>{formattedNumber}</span>
    )
}

export default FormatNumber;