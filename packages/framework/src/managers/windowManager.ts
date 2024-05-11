import { createDecorator } from '@natmri/di'

export interface IWindowManager {

}

export const IWindowManager = createDecorator('IWindowManager')

export class WindowManager implements IWindowManager {

}
