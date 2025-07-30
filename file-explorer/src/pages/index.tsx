import { useState } from "react";
import { dataPaths } from "./path";
import type { Path } from "./path";

type FolderType = {
  folder: string;
  renderNestedPath: (route: Path, folder: string) => React.JSX.Element[];
  route: Path;
  openClose: Record<string, boolean>;
  setOpenClose: (value: Record<string, boolean>) => void;
};

function Folder({
  folder,
  renderNestedPath,
  route,
  openClose,
  setOpenClose,
}: FolderType) {
  return (
    <div>
      {folder !== "/" ? (
        <div className="flex items-center gap-2">
          <button
            className="cursor-pointer"
            onClick={() =>
              setOpenClose({
                ...openClose,
                [folder]: openClose[folder] ? !openClose[folder] : true,
              })
            }
          >
            {openClose[folder] ? (
              <span className="text-2xl">▴</span>
            ) : (
              <span>▾</span>
            )}
          </button>
          <h1>{folder}</h1>
          <button className="font-bold cursor-pointer">+</button>
        </div>
      ) : null}
      <div
        className={`flex flex-col ${folder === "/" ? "pl-0" : "pl-10"} ${
          openClose[folder] ? "block" : "hidden"
        }`}
      >
        {renderNestedPath(route, folder)}
      </div>
    </div>
  );
}

export default function Home() {
  const [openClose, setOpenClose] = useState({});

  function renderNestedPath(route: Path, folder: string) {
    if (Array.isArray(route[folder])) {
      return route[folder].map((file) => {
        return <h1 key={file}>{file}</h1>;
      });
    }

    if (typeof route[folder] === "object" && route[folder] !== null) {
      return Object.keys(route[folder]).map((folder) => {
        return (
          <Folder
            key={folder}
            folder={folder}
            renderNestedPath={renderNestedPath}
            route={route}
            openClose={openClose}
            setOpenClose={setOpenClose}
          />
        );
      });
    }

    return [];
  }

  function getNestedPaths(route: Path) {
    return Object.keys(route).map((folder) => {
      return (
        <Folder
          key={folder}
          folder={folder}
          renderNestedPath={renderNestedPath}
          route={route}
          openClose={openClose}
          setOpenClose={setOpenClose}
        />
      );
    });
  }

  return (
    <div className="flex flex-col min-h-screen p-4">
      <h1 className="text-2xl">File Explorer</h1>
      {getNestedPaths(dataPaths)}
    </div>
  );
}
