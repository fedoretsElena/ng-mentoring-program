import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';


describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalStorageService
      ]
    });

    service = TestBed.get(LocalStorageService);
  });

  beforeEach(() => {
    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
      length: Object.keys(store)
    };

    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return stored token from localStorage',
    () => {
      const token = 'dsadasda432423fFDSFS';
      service.setItem('token', token);

      expect(service.getItem('token')).toEqual(token);
    });

  it('should remove all from localStorage',
    () => {
      service.removeAll();

      expect(localStorage.length).toBe(0);
    });

  it('should remove item from localStorage',
    () => {
      const KEY = 'token';
      const token = 'q2Q3d1';

      service.setItem(KEY, token);
      service.removeItem(KEY);

      expect(localStorage.getItem(KEY)).toBeNull();
    });
});
