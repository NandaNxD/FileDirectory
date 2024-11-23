import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDirectory, openDirectory } from "../store/slices/appSlice";

const File = ({ file }) => {
    const dispatch = useDispatch();

    const [folderName,setFolderName]=useState('');

    const [addFolderEnabled,setAddFolderEnabled]=useState(false);

    const lastSelectedFolderId = useSelector(
        (store) => store.directory.value.lastSelectedFolderId
    );

    const toggleFile = () => {
        dispatch(openDirectory(file.id));
    };

    const createFolder=(event)=>{
        event.stopPropagation();

        dispatch(openDirectory(file.id));
        setAddFolderEnabled(true);

    }

    const handleKeyDown=(e)=>{
        if(e.keyCode===13 && e.code==='Enter' && folderName.length){
            dispatch(createDirectory(folderName))
            setAddFolderEnabled(false)
        }
    }

    return (
        <div className="mx-4">
            <div
                onClick={toggleFile}
                className={`cursor-pointer select-none flex items-center relative gap-1 ${
                    file.id === lastSelectedFolderId ? "bg-blue-100" : ""
                } `}
            >
                <img
                    width="24"
                    height="24"
                    src="https://img.icons8.com/color/48/mac-folder.png"
                    alt="mac-folder"
                />

                {file.fileName}
                {
                    lastSelectedFolderId===file.id && !addFolderEnabled && <div className="pl-5" onClick={createFolder}>+</div>
                }
                
            </div>

            { addFolderEnabled && 
                 <div className="ml-8 my-2">
                    <input onChange={(e)=>setFolderName(e.target.value)} value={folderName} className="form-input" onKeyDown={(e)=>{
                        handleKeyDown(e);
                    }}></input>    
                </div>
            }
            {file?.isOpen && (
                <div className="mx-4">
                    {file?.files?.map((file, index) => {
                        return (
                            <File
                                file={file}
                                key={index + file.fileName}
                            ></File>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default File;
