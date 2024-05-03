import type { ServiceDescriptor, SyncDescriptor0 } from './descriptors'
import type { ServiceCollection } from './collection'
import { DI_DEPENDENCIES, DI_TARGET, type ServiceIdentifier, serviceIds } from './helper/utils'

// --- interfaces ------
export interface BrandedService { _serviceBrand: undefined }

export interface IConstructorSignature<T, Args extends any[] = []> {
  new<Services extends BrandedService[]>(...args: [...Args, ...Services]): T
}

export interface ServicesAccessor {
  get: <T>(id: ServiceIdentifier<T>) => T
}

export const IInstantiationService = createDecorator<IInstantiationService>('instantiationService')

/**
 * Given a list of arguments as a tuple, attempt to extract the leading, non-service arguments
 * to their own tuple.
 */
export type GetLeadingNonServiceArgs<Args> =
  Args extends [...BrandedService[]] ? []
    : Args extends [infer A, ...BrandedService[]] ? [A]
      : Args extends [infer A, ...infer R] ? [A, ...GetLeadingNonServiceArgs<R>]
        : never

export interface IInstantiationService {

  readonly _serviceBrand: undefined

  /**
   * Synchronously creates an instance that is denoted by the descriptor
   */
  createInstance<T>(descriptor: SyncDescriptor0<T>): T
  createInstance<Ctor extends new (...args: any[]) => any, R extends InstanceType<Ctor>>(ctor: Ctor, ...args: GetLeadingNonServiceArgs<ConstructorParameters<Ctor>>): R

  /**
   * Calls a function with a service accessor.
   */
  invokeFunction: <R, TS extends any[] = []>(fn: (accessor: ServicesAccessor, ...args: TS) => R, ...args: TS) => R

  /**
   * Creates a child of this service which inherits all current services
   * and adds/overwrites the given services.
   */
  createChild: (services: ServiceCollection) => IInstantiationService

  /**
   * Disposes this instantiation service.
   *
   * - Will dispose all services that this instantiation service has created.
   * - Will dispose all its children but not its parent.
   * - Will NOT dispose services-instances that this service has been created with
   * - Will NOT dispose consumer-instances this service has created
   */
  dispose(): void
}

function storeServiceDependency(id: Function, target: Function, index: number): void {
  if ((target as any)[DI_TARGET] === target) {
    (target as any)[DI_DEPENDENCIES].push({ id, index })
  }
  else {
    (target as any)[DI_DEPENDENCIES] = [{ id, index }];
    (target as any)[DI_TARGET] = target
  }
}

/**
 * The *only* valid way to create a {{ServiceIdentifier}}.
 */
export function createDecorator<T extends ServiceDescriptor>(serviceId: string): ServiceIdentifier<T> {
  if (serviceIds.has(serviceId))
    return serviceIds.get(serviceId)!

  const id = <any> function (target: Function, key: string, index: number): any {
    if (arguments.length !== 3)
      throw new Error('@IServiceName-decorator can only be used to decorate a parameter')

    storeServiceDependency(id, target, index)
  }

  id.toString = () => serviceId

  serviceIds.set(serviceId, id)
  return id
}

export function refineServiceDecorator<T1, T extends T1>(serviceIdentifier: ServiceIdentifier<T1>): ServiceIdentifier<T> {
  return <ServiceIdentifier<T>>serviceIdentifier
}
