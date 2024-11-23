import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

export const directorySlice = createSlice({
    name: "directorySlice",
    initialState: {
        value: {
            lastSelectedFolderId: null,
            directoryStructure: {
                id: 1,
                fileName: "directory 1",
                isOpen: false,
                files: [
                    {
                        id: 2,
                        fileName: "file 1",
                        files: [],
                    },
                    {
                        id: 3,
                        fileName: "file 2",
                        files: [
                            {
                                id: 4,
                                fileName: "file 3",
                                files: [
                                    {
                                        id: 5,
                                        fileName: "file 4",
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        },
    },
    reducers: {
        openDirectory(state, action) {
            const toggleFileDirectorOpen = (filesData, fileId) => {
                if (fileId === filesData.id) {
                    state.value.lastSelectedFolderId = fileId;
                    filesData.isOpen = !filesData.isOpen;
                    return;
                }

                filesData?.files?.map((file) => {
                    toggleFileDirectorOpen(file, fileId);
                });
            };

            toggleFileDirectorOpen(
                state.value.directoryStructure,
                action.payload
            );
        },

        createDirectory(state, action) {
            const traverseDirectory = (filesData, fileName) => {
                if (state.value.lastSelectedFolderId === filesData.id) {
                    if (filesData.files) {
                        filesData.files.push({
                            id: Math.random(),
                            fileName,
                        });
                    } else {
                        filesData.files = [
                            {
                                id: Math.random(),
                                fileName,
                            },
                        ];
                    }

                    return;
                }

                filesData?.files?.map((file) => {
                    traverseDirectory(file, fileName);
                });
            };

            traverseDirectory(state.value.directoryStructure, action.payload);
        },

        closeDirectory(state, action) {},
        openFile(state, action) {},
        closeFile(state, action) {},
    },
});

// Action creators are generated for each case reducer function
export const {
    openDirectory,
    closeDirectory,
    openFile,
    closeFile,
    createDirectory,
} = directorySlice.actions;
