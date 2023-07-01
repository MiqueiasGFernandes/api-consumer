import { ExecException, exec } from "child_process";

export class CommanderUtil {
  static execute(commandString: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const child = exec(
        commandString,
        (error: ExecException | null, stdout: string, stderr: string) => {
          if (error || stderr) {
            console.error(
              "Something went wrong executing this command: ",
              error?.message || stderr
            );
            reject(error);
          } else {
            console.log("Command output: ", stdout);
            resolve();
          }
        }
      );

      child.on("error", (error: ExecException) => {
        console.error("Error occurred during command execution: ", error);
        reject(error);
      });
    });
  }
}
