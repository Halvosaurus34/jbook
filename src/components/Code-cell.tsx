import { useState, useEffect } from "react";
import CodeEditor from "./code-editor";
import Preview from "./Preview";
import bundle from "../bundler";
import Resizable from "./Resizable";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [err, setErr] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output.code);
      setErr(output.err);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="console.log('Hello World');"
            onChange={(value) => setInput(value)}
          />
        </Resizable>

        <Preview code={code} bundlingStatus={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
