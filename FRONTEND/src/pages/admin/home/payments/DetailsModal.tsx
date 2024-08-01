"use client";
import React from "react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from "../../../../utils/asternityUi/SourceCode";

export function DetailsModal() {
    return (
        <div className="w-full p-2">
            <Modal>
                <ModalTrigger className="relative bg-black w-full text-white flex justify-center group/modal-btn rounded-b-lg z-10">
                    <span className="text-center text-white transition duration-500">
                        ShowDetails
                    </span>
                </ModalTrigger>
                <ModalBody>
                    <ModalContent className="w-full max-w-md mx-auto bg-white dark:bg-black p-6 rounded-lg z-50"> 
                        <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                            You Have 
                            <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                                1000
                            </span>{" "}
                            on Your Wallet
                        </h4>
                        <div className="flex justify-center text-gray-400 items-center mb-8">
                            <h3>
                                You can retrieve the money when you complete the event
                            </h3>
                        </div>
                        <ModalFooter className="flex justify-center mt-5">
                            <button
                                className="bg-black text-white dark:bg-white dark:text-black text-sm px-4 py-2 rounded-md border border-black"
                            >
                                Credit amount
                            </button>
                        </ModalFooter>
                    </ModalContent>
                </ModalBody>
            </Modal>
        </div>
    );
}
