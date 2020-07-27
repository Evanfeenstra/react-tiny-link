const electron = window.require ? window.require("electron") : {}

export async function etch(url, config){
  const obj = {url, config}
  const ret = await sendIPC('etch', obj)
  return ret
}

const timeoutSeconds = 10
export function sendIPC(k: string, v:object){
  const ipc = electron.ipcRenderer
  if(!ipc) return
  const rid = `${k}_${Math.random().toString(36).substring(7)}`
  ipc.send(k, {...v, rid})
  const timeout = new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      clearTimeout(id);
      resolve('')
    }, 1000*timeoutSeconds)
  })
  const response = new Promise(resolve => {
    ipc.once(rid, (event, response) => resolve(response));
  })
  return Promise.race([response, timeout])
}