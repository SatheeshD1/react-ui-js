import { ReactTerminal } from "react-terminal";

function App(props) {
    // Define commands here
    const commands = {
        whoami: "jackharper",
        cd: (directory) => `changed path to ${directory}`
    };

    return (
        <ReactTerminal
            commands={commands}
            themes={{
                "my-custom-theme": {
                    themeBGColor: "#272B36",
                    themeToolbarColor: "#c084fc",
                    themeColor: "#FFFEFC",
                    themePromptColor: "#a917a8"
                }
            }}
            theme="my-custom-theme"
        />
    );
}