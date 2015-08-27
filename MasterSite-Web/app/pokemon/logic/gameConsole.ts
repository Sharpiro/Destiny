class GameConsole
{
    public static currentConsoleText = "";
    public static showConsole = false;
    private static consoleTextArray = <Array<string>>[];
    private static textArrayIndex = 0;

    public static writeToConsole = (input: string): void =>
    {
        let textarea: HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById("textArea");
        let textBox: HTMLInputElement = <HTMLInputElement>document.getElementById("inputTextBox");
        textarea.scrollTop = textarea.scrollHeight;
        textarea.value += `${input}\n`;
        textBox.value = "";
        GameConsole.showConsole = true;
        GameConsole.splitInput(input);
        //console.log(input);
    }

    private static splitInput(input: string): void
    {
        const allWords = input.split(" ");
        if (!allWords) return;
        for (let i = 0; i < allWords.length; i++)
        {
            GameConsole.consoleTextArray.push(allWords[i]);
            GameConsole.currentConsoleText += i < 5 && allWords[i] ? `${allWords[i]} ` : "";
        }
        GameConsole.textArrayIndex = 5;
        GameConsole.consoleTextArray = allWords;
    }

    public static nextText(): void
    {
        //GameConsole.textArrayIndex++;
        let index = GameConsole.textArrayIndex;
        if (GameConsole.consoleTextArray[index])
        {
            GameConsole.currentConsoleText = "";
            const allWords = GameConsole.consoleTextArray;
            for (let i = index; i < index + 5; i++)
            {
                GameConsole.currentConsoleText += i < index + 5 && allWords[i] ? `${allWords[i]} ` : "";
            }
            GameConsole.textArrayIndex = index + 5;
        } else
        {
            GameConsole.currentConsoleText = "";
            GameConsole.textArrayIndex = 0;
            GameConsole.showConsole = false;
        }
    }
}