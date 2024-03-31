import { readdir } from "fs/promises";
import { join } from "path";

export const ModalManager = async (client, rootPath) => {
    const ModalDir = join(rootPath, "src", "interactionEvents", "Modal");
    const ModalFiles = await readdir(ModalDir);
  
    await Promise.all(
        ModalFiles.map(async (ModalFiles) => {
        const { Modal } = await import(`file://${join(ModalDir, ModalFiles)}`)
        if (Modal && !Modal.ignore && Modal.name) {
          client.modals.set(Modal.name, Modal);
        }
      })
    );
  };
  
