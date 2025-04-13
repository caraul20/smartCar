'use client';

import React from 'react';

export default function AccountSettingsPage() {
  // TODO: Implement functionality to update user settings

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Setări Cont</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Gestionează parola și preferințele de notificare.</p>
      </div>

      {/* Change Password Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Schimbare Parolă</h2>
        </div>
        <form className="p-6 space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Parola Curentă</label>
            <input id="currentPassword" type="password" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500" disabled />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Parola Nouă</label>
            <input id="newPassword" type="password" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500" disabled />
          </div>
          <div>
            <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirmă Parola Nouă</label>
            <input id="confirmNewPassword" type="password" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500" disabled />
          </div>
          <div className="pt-2">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50" disabled>
                Schimbă Parola (în curând)
            </button>
          </div>
        </form>
      </div>

      {/* Notification Preferences Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
         <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Preferințe Notificări</h2>
        </div>
        <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
                <label htmlFor="emailNotif" className="text-sm text-gray-700 dark:text-gray-300">Primiți notificări prin email despre rezervări</label>
                <input type="checkbox" id="emailNotif" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-70" disabled />
            </div>
            <div className="flex items-center justify-between">
                <label htmlFor="smsNotif" className="text-sm text-gray-700 dark:text-gray-300">Primiți notificări prin SMS (opțional)</label>
                <input type="checkbox" id="smsNotif" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-70" disabled />
            </div>
             <div className="flex items-center justify-between">
                <label htmlFor="promoNotif" className="text-sm text-gray-700 dark:text-gray-300">Primiți oferte promoționale prin email</label>
                <input type="checkbox" id="promoNotif" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-70" disabled />
            </div>
        </div>
         <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 text-right">
             <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50" disabled>
                Salvează Preferințe (în curând)
            </button>
        </div>
      </div>
    </div>
  );
} 