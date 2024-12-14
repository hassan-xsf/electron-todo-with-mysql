import { Minus, Square, X } from "lucide-react";
import { Button } from "./ui/button";

const TitleBar = () => {
  const handleMinimize = () => {
    window.electron.minimize();
  };

  const handleMaximize = () => {
    window.electron.maximize();
  };

  const handleClose = () => {
    window.electron.close();
  };

  return (
    <div
      style={{ WebkitAppRegion: "drag" } as React.CSSProperties}
      className="flex h-10 items-center justify-between  bg-white dark:bg-zinc-900 px-4"
    >
      <div className="flex items-center space-x-2">
        <div className="flex space-x-2">
          <button className="h-3 w-3 rounded-full bg-red-500 hover:bg-red-600">
            <X className="h-3 w-3 text-transparent hover:text-white" />
          </button>
          <button className="h-3 w-3 rounded-full bg-yellow-500 hover:bg-yellow-600">
            <Minus className="h-3 w-3 text-transparent hover:text-white" />
          </button>
          <button className="h-3 w-3 rounded-full bg-green-500 hover:bg-green-600">
            <Square className="h-3 w-3 text-transparent hover:text-white" />
          </button>
        </div>
        <span className="ml-4 text-sm font-medium text-foreground">
          EasyNotes
        </span>
      </div>
      <div
        style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}
        className="flex items-center gap-1"
      >
        <Button
          variant="ghost"
          onClick={handleMinimize}
          size="icon"
          className="h-8 w-8 rounded-none text-foreground hover:bg-white/10"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          onClick={handleMaximize}
          size="icon"
          className="h-8 w-8 rounded-none text-foreground hover:bg-white/10"
        >
          <Square className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="h-8 w-8 rounded-lg bg-red-500 text-white hover:bg-red-600"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TitleBar;
