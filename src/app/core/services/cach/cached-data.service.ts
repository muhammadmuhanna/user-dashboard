import { Injectable } from '@angular/core';

/**
 * A service to provide a simple caching mechanism with expiration functionality.
 * This service allows storing and retrieving data with an optional time-to-live (TTL) setting.
 * Cached data will be automatically invalidated after the specified TTL.
 */
@Injectable({
  providedIn: 'root'
})
export class CachedDataService {
  /**
   * A Map to store cached data along with their expiration timestamps.
   */
  private cache = new Map<string, { data: any, expiration: number }>();

  /**
   * Default expiration time for cached data in milliseconds.
   */
  private defaultExpiration = 60000; // Default is 60 seconds

  constructor() {}

  /**
   * Stores data in the cache with an optional TTL. If no TTL is provided,
   * the defaultExpiration will be used.
   *
   * @param key The unique key to identify the cached data.
   * @param data The data to be cached.
   * @param ttl The time-to-live in milliseconds for the cache entry (optional).
   */
  set(key: string, data: any, ttl?: number): void {
    const expiration = Date.now() + (ttl || this.defaultExpiration);
    this.cache.set(key, { data: JSON.stringify(data), expiration });

    setTimeout(() => this.invalidate(key), ttl || this.defaultExpiration);
  }

  /**
   * Retrieves data from the cache. If the data has expired or does not exist,
   * null will be returned.
   *
   * @param key The key of the data to retrieve from the cache.
   * @returns The cached data or null if it's not found or expired.
   */
  get(key: string): any {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiration) {
      this.invalidate(key);
      return null;
    }

    return JSON.parse(item.data);
  }

  /**
   * Invalidates (removes) a specific cache entry.
   *
   * @param key The key of the cache entry to invalidate.
   */
  invalidate(key: string): void {
    this.cache.delete(key);
  }
}
