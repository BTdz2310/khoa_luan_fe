import { atom, useAtom } from 'jotai';

export enum DialogEnum {
  CREATE_PROFILE = 'account.profile.create',
}

export type DialogName = 
  DialogEnum.CREATE_PROFILE

export type DialogPayload<T = unknown> = {
  item: T;
};

type Dialog<T = unknown> = {
  name: DialogName;
  payload?: DialogPayload<T>;
};

type DialogState = Dialog[];

const dialogAtom = atom<DialogState>([]);

export const useDialog = (name: DialogName) => {
  const [dialogs, setDialogs] = useAtom(dialogAtom);

  const isOpen = dialogs.some((dialog) => dialog.name === name);
  const payload = dialogs.find((dialog) => dialog.name === name)?.payload as DialogPayload | undefined;
  const index = dialogs.map(dialog => dialog.name).indexOf(name)

  const open = (payload?: DialogPayload) => {
    setDialogs((prev) => [...prev, { name, payload }]);
  };

  const close = () => {
    setDialogs((prev) => prev.filter((dialog) => dialog.name !== name));
  };

  const closeLatest = () => {
    setDialogs((prev) => prev.slice(0, -1));
  };

  const closeAll = () => {
    setDialogs([]);
  };

  return { isOpen, payload, open, close, closeLatest, closeAll, index };
};
