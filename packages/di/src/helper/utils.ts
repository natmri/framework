/**
 * Identifies a service of type `T`.
 */
export interface ServiceIdentifier<T> {
  (...args: any[]): void
  type: T
}

export const serviceIds = new Map<string, ServiceIdentifier<any>>()

export const DI_TARGET = '$di$target'
export const DI_DEPENDENCIES = '$di$dependencies'

export function getServiceDependencies(ctor: any): { id: ServiceIdentifier<any>, index: number }[] {
  return ctor[DI_DEPENDENCIES] || []
}
