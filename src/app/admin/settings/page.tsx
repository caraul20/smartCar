'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AdminSettingsPage() {
  // General Settings
  const [companyName, setCompanyName] = useState('SmartCar Rental');
  const [supportEmail, setSupportEmail] = useState('support@smartcar.ro');
  const [supportPhone, setSupportPhone] = useState('0800-123-4567');
  
  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [adminAlerts, setAdminAlerts] = useState(true);
  
  // Booking Settings
  const [minRentalPeriod, setMinRentalPeriod] = useState(1);
  const [maxRentalPeriod, setMaxRentalPeriod] = useState(30);
  const [advanceBookingDays, setAdvanceBookingDays] = useState(90);
  
  // Tax & Fees Settings
  const [vatRate, setVatRate] = useState(19);
  const [serviceFee, setServiceFee] = useState(5);
  const [lateCancelFee, setLateCancelFee] = useState(20);
  
  // Other Settings
  const [darkModeAdmin, setDarkModeAdmin] = useState(false);
  const [language, setLanguage] = useState('ro');
  const [currency, setCurrency] = useState('EUR');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Setări Administrator</h1>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Salvează Modificările
        </button>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="border-b border-gray-200 bg-gray-50 px-4 py-4 dark:border-gray-800 dark:bg-gray-800/50">
            <h2 className="text-base font-medium text-gray-900 dark:text-white">Setări Generale</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Numele Companiei
                </label>
                <input
                  type="text"
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="supportEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Suport
                </label>
                <input
                  type="email"
                  id="supportEmail"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="supportPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Telefon Suport
                </label>
                <input
                  type="text"
                  id="supportPhone"
                  value={supportPhone}
                  onChange={(e) => setSupportPhone(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="border-b border-gray-200 bg-gray-50 px-4 py-4 dark:border-gray-800 dark:bg-gray-800/50">
            <h2 className="text-base font-medium text-gray-900 dark:text-white">Setări Notificări</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notificări Email</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Trimite notificări prin email pentru rezervări, anulări, etc.
                </p>
              </div>
              <div className="relative inline-block h-6 w-11 flex-shrink-0">
                <input
                  type="checkbox"
                  id="emailToggle"
                  checked={emailNotifications}
                  onChange={() => setEmailNotifications(!emailNotifications)}
                  className="peer sr-only"
                />
                <label
                  htmlFor="emailToggle"
                  className="absolute inset-0 cursor-pointer rounded-full bg-gray-200 transition peer-checked:bg-blue-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:bg-gray-700 dark:peer-focus:ring-blue-800"
                >
                  <span className="absolute left-[2px] top-[2px] h-5 w-5 rounded-full bg-white transition-all peer-checked:left-[22px] dark:bg-gray-300" />
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notificări SMS</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Trimite SMS-uri importante pentru rezervări și modificări.
                </p>
              </div>
              <div className="relative inline-block h-6 w-11 flex-shrink-0">
                <input
                  type="checkbox"
                  id="smsToggle"
                  checked={smsNotifications}
                  onChange={() => setSmsNotifications(!smsNotifications)}
                  className="peer sr-only"
                />
                <label
                  htmlFor="smsToggle"
                  className="absolute inset-0 cursor-pointer rounded-full bg-gray-200 transition peer-checked:bg-blue-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:bg-gray-700 dark:peer-focus:ring-blue-800"
                >
                  <span className="absolute left-[2px] top-[2px] h-5 w-5 rounded-full bg-white transition-all peer-checked:left-[22px] dark:bg-gray-300" />
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Alerte Administrator</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Primește alerte pentru probleme și acțiuni importante.
                </p>
              </div>
              <div className="relative inline-block h-6 w-11 flex-shrink-0">
                <input
                  type="checkbox"
                  id="adminToggle"
                  checked={adminAlerts}
                  onChange={() => setAdminAlerts(!adminAlerts)}
                  className="peer sr-only"
                />
                <label
                  htmlFor="adminToggle"
                  className="absolute inset-0 cursor-pointer rounded-full bg-gray-200 transition peer-checked:bg-blue-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:bg-gray-700 dark:peer-focus:ring-blue-800"
                >
                  <span className="absolute left-[2px] top-[2px] h-5 w-5 rounded-full bg-white transition-all peer-checked:left-[22px] dark:bg-gray-300" />
                </label>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Booking Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="border-b border-gray-200 bg-gray-50 px-4 py-4 dark:border-gray-800 dark:bg-gray-800/50">
            <h2 className="text-base font-medium text-gray-900 dark:text-white">Setări Rezervări</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <label htmlFor="minRental" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Perioadă Minimă (zile)
                </label>
                <input
                  type="number"
                  id="minRental"
                  min="1"
                  max="14"
                  value={minRentalPeriod}
                  onChange={(e) => setMinRentalPeriod(parseInt(e.target.value, 10))}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="maxRental" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Perioadă Maximă (zile)
                </label>
                <input
                  type="number"
                  id="maxRental"
                  min="7"
                  max="180"
                  value={maxRentalPeriod}
                  onChange={(e) => setMaxRentalPeriod(parseInt(e.target.value, 10))}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="advanceDays" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Zile Rezervare Anticipată
                </label>
                <input
                  type="number"
                  id="advanceDays"
                  min="7"
                  max="365"
                  value={advanceBookingDays}
                  onChange={(e) => setAdvanceBookingDays(parseInt(e.target.value, 10))}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tax & Fees Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="border-b border-gray-200 bg-gray-50 px-4 py-4 dark:border-gray-800 dark:bg-gray-800/50">
            <h2 className="text-base font-medium text-gray-900 dark:text-white">Taxe & Comisioane</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <label htmlFor="vatRate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Rata TVA (%)
                </label>
                <input
                  type="number"
                  id="vatRate"
                  min="0"
                  max="30"
                  value={vatRate}
                  onChange={(e) => setVatRate(parseInt(e.target.value, 10))}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="serviceFee" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Comision Serviciu (%)
                </label>
                <input
                  type="number"
                  id="serviceFee"
                  min="0"
                  max="50"
                  value={serviceFee}
                  onChange={(e) => setServiceFee(parseInt(e.target.value, 10))}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="cancelFee" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Comision Anulare Târzie (%)
                </label>
                <input
                  type="number"
                  id="cancelFee"
                  min="0"
                  max="100"
                  value={lateCancelFee}
                  onChange={(e) => setLateCancelFee(parseInt(e.target.value, 10))}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="border-b border-gray-200 bg-gray-50 px-4 py-4 dark:border-gray-800 dark:bg-gray-800/50">
            <h2 className="text-base font-medium text-gray-900 dark:text-white">Alte Setări</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <label htmlFor="darkMode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mod Întunecat (Admin)
                </label>
                <div className="mt-2">
                  <div className="relative inline-block h-6 w-11 flex-shrink-0">
                    <input
                      type="checkbox"
                      id="darkMode"
                      checked={darkModeAdmin}
                      onChange={() => setDarkModeAdmin(!darkModeAdmin)}
                      className="peer sr-only"
                    />
                    <label
                      htmlFor="darkMode"
                      className="absolute inset-0 cursor-pointer rounded-full bg-gray-200 transition peer-checked:bg-blue-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:bg-gray-700 dark:peer-focus:ring-blue-800"
                    >
                      <span className="absolute left-[2px] top-[2px] h-5 w-5 rounded-full bg-white transition-all peer-checked:left-[22px] dark:bg-gray-300" />
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Limbă
                </label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
                >
                  <option value="ro">Română</option>
                  <option value="en">Engleză</option>
                  <option value="fr">Franceză</option>
                  <option value="de">Germană</option>
                </select>
              </div>
              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Monedă
                </label>
                <select
                  id="currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
                >
                  <option value="EUR">Euro (€)</option>
                  <option value="RON">Lei (RON)</option>
                  <option value="USD">Dolar ($)</option>
                  <option value="GBP">Liră (£)</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex justify-end">
          <button className="mr-3 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
            Anulează
          </button>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Salvează Setările
          </button>
        </div>
      </div>
    </div>
  );
} 