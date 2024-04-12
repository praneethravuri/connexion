function capitalize(word: string): string {
    if (word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    return '';
}

export default capitalize;