"use client"

import { ArrowLeft } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import { Country, State, City } from "country-state-city";
import GradientBg from '@/components/GradientBg';
// import { User } from "@/lib/type/type";


// const plans = {
//   starter: { name: "Starter", price: 0, period: "/month" },
//   professional: { name: "Professional", price: 29, period: "/month" },
//   enterprise: { name: "Enterprise", price: null, period: "Custom" },
// }

export default function BillingForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const planId = searchParams.get("plan") || "professional"
  // const plan = plans[planId as keyof typeof plans]

  // const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [plan, setPlan] = useState<any>(null);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const [countrySearch, setCountrySearch] = useState("");
  const [stateSearch, setStateSearch] = useState("");

  const [countryOpen, setCountryOpen] = useState(false);
  const [stateOpen, setStateOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);

  const countryRef = useRef<HTMLDivElement | null>(null);
  const stateRef = useRef<HTMLDivElement | null>(null);
  const cityRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        countryRef.current &&
        countryRef.current.contains(target)
      ) return;

      if (
        stateRef.current &&
        stateRef.current.contains(target)
      ) return;

      if (
        cityRef.current &&
        cityRef.current.contains(target)
      ) return;

      // clicked outside ALL dropdowns
      setCountryOpen(false);
      setStateOpen(false);
      setCityOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [formData, setFormData] = useState({
    fullName: '',
    country: '',
    state: '',
    city: '',
    zipCode: '',
    address1: '',
    address2: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  useEffect(() => {
  if (!planId) return;

  const fetchData = async () => {
    try {
      setLoading(true);

      const [userRes, planRes] = await Promise.all([
        fetch("/api/user/edit", { credentials: "include" }),
        fetch(`/api/subscriptionplan/${planId}`, {
          method: "GET",
          credentials: "include",
        }),
      ]);

      if (!userRes.ok) throw new Error("Unauthorized");
      if (!planRes.ok) throw new Error("Plan fetch failed");

      const userData = await userRes.json();
      const planData = await planRes.json();

      // ---------- USER ----------
      if (!userData?.user) throw new Error("User not found");

      const info = userData.user.AddressInfo?.[0];
      if (info) {
        setFormData((prev) => ({
          ...prev,
          fullName: userData.user.name || "",
          city: info.city || "",
          state: info.state || "",
          zipCode: info.zipCode || "",
          country: info.country || "",
          address1: info.Address1 || "",
          address2: info.Address2 || "",
        }));

        const countryISO = Country.getAllCountries().find(
          (c) =>
            c.name.toLowerCase().trim() ===
            info.country?.toLowerCase().trim()
        )?.isoCode;

        const stateISO = State.getStatesOfCountry(countryISO || "").find(
          (s) =>
            s.name.toLowerCase().trim() ===
            info.state?.toLowerCase().trim()
        )?.isoCode;

        setSelectedCountry(countryISO || "");
        setSelectedState(stateISO || "");
      }

      // ---------- PLAN ----------
      setPlan(planData.subscriptionPlan);
    } catch (error) {
      setError("Unable to load checkout data.");
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [planId]);
  
  if (loading && !plan) {
    return (
      <div className="flex items-center justify-center min-h-screen text-muted-foreground">
        Loading billing page...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-muted-foreground">
        {error ?? "No Information of user"}
      </div>
    );
  }

  const baseInputClass =
    "w-full px-4 py-3 rounded-lg bg-background/60 dark:bg-neutral-900/20 border border-neutral-800 text-foreground focus:outline-none flex items-center justify-between cursor-pointer";

  return (
    <div className="p-6 ">
      <GradientBg />
      {/* Background decorative elements */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        Light mode blobs
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-20  dark:hidden" />
        <div className="absolute bottom-20 right-40 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-20  dark:hidden" />

        Dark mode blobs
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400 rounded-full blur-3xl opacity-30  hidden dark:block mix-blend-screen" />
        <div className="absolute bottom-20 right-40 w-96 h-96 bg-fuchsia-500 rounded-full blur-3xl opacity-30  hidden dark:block mix-blend-screen" />
      </div> */}
      <div className="max-w-5xl mx-auto ">
        <button className="flex items-center gap-2 text-foreground/70 hover:text-foreground mb-2 sm:mt-5 text-sm cursor-pointer" onClick={() => router.back()}>
          <span><ArrowLeft size={15} /></span> Back
        </button>

        <div >
          <h1 className="text-3xl font-semibold mb-5 text-foreground">Billing details</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left side - Form */}
            <div className=''>
              <h2 className="font-semibold mb-2 text-foreground">Enter your name and address</h2>

              {/* Full Name */}
              <div className="mb-2">
                <label className="block text-sm text-foreground mb-1">
                  Full name*
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="First and last name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-background/60 dark:bg-neutral-900/20 border border-neutral-800 placeholder-foreground/40 dark:placeholder-gray-500 focus:outline-none text-foreground"
                />
              </div>

              {/* Country and State */}
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div ref={countryRef} className='relative'>
                  <label className="block text-sm text-foreground mb-1">
                    Country*
                  </label>

                  {/* Input */}
                  <div
                    className={baseInputClass}
                    onClick={() => {
                      setCountryOpen((prev) => !prev);
                      setStateOpen(false);
                      setCityOpen(false);
                    }}

                  >
                    <span>
                      {selectedCountry
                        ? Country.getAllCountries().find(c => c.isoCode === selectedCountry)?.name
                        : "Select country"}
                    </span>

                    <svg
                      className={`w-4 h-4 transition-transform ${countryOpen ? "rotate-180" : ""}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M5.25 7.5L10 12.25 14.75 7.5" />
                    </svg>
                  </div>

                  {/* Dropdown */}
                  {countryOpen && (
                    <div className="absolute z-50 mt-1 w-auto rounded-lg border border-neutral-800 bg-background shadow-lg">
                      <input
                        className="w-full px-3 py-2 border-b border-neutral-800 bg-transparent outline-none text-sm text-foreground"
                        placeholder="Search country..."
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                      />

                      <div className="max-h-52 overflow-auto">
                        {Country.getAllCountries()
                          .filter(c =>
                            c.name.toLowerCase().includes(countrySearch.toLowerCase())
                          )
                          .map(c => (
                            <div
                              key={c.isoCode}
                              onClick={() => {
                                setSelectedCountry(c.isoCode);
                                setSelectedState("");
                                setCountryOpen(false);
                                setCountrySearch("");
                              }}
                              className="px-4 py-2 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 text-foreground"
                            >
                              {c.name}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                <div ref={stateRef} className='relative'>
                  <label className="block text-sm text-foreground mb-1">
                    State/Region*
                  </label>

                  <div
                    className={`${baseInputClass} ${!selectedCountry && "opacity-50 cursor-not-allowed"}`}
                    onClick={() => {
                      if (!selectedCountry) return;
                      setStateOpen((prev) => !prev);
                      setCountryOpen(false);
                      setCityOpen(false);
                    }}

                  >
                    <span>
                      {selectedState
                        ? State.getStatesOfCountry(selectedCountry).find(s => s.isoCode === selectedState)?.name
                        : "Select state/region"}
                    </span>

                    <svg
                      className={`w-4 h-4 transition-transform ${stateOpen ? "rotate-180" : ""}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M5.25 7.5L10 12.25 14.75 7.5" />
                    </svg>
                  </div>

                  {stateOpen && selectedCountry && (
                    <div className="absolute z-50 mt-1 w-auto rounded-lg border border-neutral-800 bg-background shadow-lg">
                      <input
                        className="w-full px-3 py-2 border-b border-neutral-800 bg-transparent outline-none text-sm text-foreground"
                        placeholder="Search state..."
                        value={stateSearch}
                        onChange={(e) => setStateSearch(e.target.value)}
                      />

                      <div className="max-h-52 overflow-auto">
                        {State.getStatesOfCountry(selectedCountry)
                          .filter(s =>
                            s.name.toLowerCase().includes(stateSearch.toLowerCase())
                          )
                          .map(s => (
                            <div
                              key={s.isoCode}
                              onClick={() => {
                                setSelectedState(s.isoCode);
                                setFormData({ ...formData, state: s.isoCode, city: "" });
                                setStateOpen(false);
                                setStateSearch("");
                              }}
                              className="px-4 py-2 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 text-foreground"
                            >
                              {s.name}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* <div className="grid grid-cols-2 gap-4 mb-2">
                
                <div>
                  <label className="block text-sm text-foreground dark:text-gray-300 mb-1">
                    Country*
                  </label>

                  <select
                    name="country"
                    value={selectedCountry}
                    onChange={(e) => {
                      setSelectedCountry(e.target.value);
                      setSelectedState("");
                    }}
                    className="w-full px-4 py-3 rounded-lg bg-background dark:bg-neutral-900/20 border border-neutral-800 text-foreground focus:outline-none"
                  >
                    <option value="">Select country</option>

                    {Country.getAllCountries().map((c) => (
                      <option
                        key={c.isoCode}
                        value={c.isoCode}
                        className="bg-background"
                      >
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                
                <div>
                  <label className="block text-sm text-foreground dark:text-gray-300 mb-1">
                    State/Region*
                  </label>

                  <select
                    name="state"
                    value={selectedState}
                    disabled={!selectedCountry}
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      setFormData({
                        ...formData,
                        state: e.target.value,
                        city: "",
                      });
                    }}
                    className="w-full px-4 py-3 rounded-lg bg-background dark:bg-neutral-900/20 border border-neutral-800 focus:outline-none text-foreground disabled:cursor-not-allowed"
                  >
                    <option value="" className="bg-background">
                      Select state/region
                    </option>

                    {State.getStatesOfCountry(selectedCountry).map((s) => (
                      <option
                        key={s.isoCode}
                        value={s.isoCode}
                        className="bg-background"
                      >
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div> */}


              {/* City and Zip Code */}
              <div className="grid grid-cols-2 gap-4 mb-2">
                {/* <div>
                  <label className="block text-sm text-foreground mb-1">
                    City*
                  </label>

                  <input
                    type="text"
                    name="city"
                    list="city-list"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    disabled={!selectedState}
                    className="w-full px-4 py-3 rounded-lg bg-background dark:bg-neutral-900/20 border border-neutral-800 placeholder-foreground/40 focus:outline-none text-foreground disabled:cursor-not-allowed"
                    placeholder="Enter city"
                  />

                  <datalist id="city-list" className='bg-background'>
                    {selectedState &&
                      City.getCitiesOfState(
                        selectedCountry,
                        selectedState
                      ).map((c) => (
                        <option key={c.name} value={c.name} />
                      ))}
                  </datalist>
                </div> */}
                <div ref={cityRef} className='relative'>
                  <label className="block text-sm text-foreground mb-1">
                    City*
                  </label>

                  <input
                    type="text"
                    value={formData.city}
                    disabled={!selectedState}
                    onFocus={() => {
                      setCityOpen(true);
                      setCountryOpen(false);
                      setStateOpen(false);
                    }}

                    onChange={(e) => {
                      setFormData({ ...formData, city: e.target.value });
                      setCityOpen(true);
                    }}
                    placeholder="Enter city"
                    className="w-full px-4 py-3 rounded-lg bg-background/60 dark:bg-neutral-900/20 
               border border-neutral-800 placeholder-foreground/40 
               focus:outline-none text-foreground disabled:cursor-not-allowed"
                  />

                  {/* Dropdown */}
                  {cityOpen && selectedState && (
                    <div
                      className="absolute z-50 mt-1 w-auto max-h-56 overflow-auto
                 rounded-lg border border-neutral-800
                 bg-background  shadow-lg"
                    >
                      {City.getCitiesOfState(selectedCountry, selectedState)
                        .filter((c) =>
                          c.name.toLowerCase().includes(formData.city.toLowerCase())
                        )
                        .map((c) => (
                          <div
                            key={c.name}
                            onClick={() => {
                              setFormData({ ...formData, city: c.name });
                              setCityOpen(false);
                            }}
                            className="px-4 py-2 cursor-pointer
                       hover:bg-neutral-200 dark:hover:bg-neutral-800
                       text-foreground"
                          >
                            {c.name}
                          </div>
                        ))}

                      {/* Empty State */}
                      {City.getCitiesOfState(selectedCountry, selectedState).length === 0 && (
                        <div className="px-4 py-2 text-sm text-muted-foreground">
                          No cities found
                        </div>
                      )}
                    </div>
                  )}
                </div>


                <div>
                  <label className="block text-sm text-foreground mb-1">
                    Zip/postal code*
                  </label>
                  <input
                    type='text'
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    disabled={!formData.city}
                    className="w-full px-4 py-3 rounded-lg bg-background/60 dark:bg-neutral-900/20 border border-neutral-800 placeholder-foreground/40 focus:outline-none text-foreground disabled:cursor-not-allowed"
                  />
                </div>
              </div>


              {/* Address Line 1 */}
              <div className="mb-2">
                <label className="block text-sm text-foreground mb-1">
                  Address line 1*
                </label>
                <input
                  type="text"
                  name="address1"
                  placeholder="Street address"
                  value={formData.address1}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-background/60 dark:bg-neutral-900/20 border border-neutral-800 placeholder-foreground/40 dark:placeholder-gray-500 focus:outline-none text-foreground"
                />
              </div>

              {/* Address Line 2 */}
              <div className="mb-2">
                <label className="block text-sm text-foreground mb-1">
                  Address line 2*
                </label>
                <input
                  type="text"
                  name="address2"
                  placeholder="Apt/Suite/Unit, etc"
                  value={formData.address2}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-background/60 dark:bg-neutral-900/20 border border-neutral-800 placeholder-foreground/40 dark:placeholder-gray-500 focus:outline-none text-foreground"
                />
              </div>
            </div>

            {/* Right side - Summary */}
            <div className="">
              <div className="bg-background/60 dark:bg-neutral-900/20 rounded-lg p-6 shadow-[0_0_11px_rgba(0,0,0,0.2)] dark:shadow-[0_0_7px_rgba(255,255,255,0.1)]">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-foreground/70 dark:text-gray-300 text-sm">Plan name</span>
                  <span className="text-foreground">{plan.name}</span>
                </div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-foreground/70 dark:text-gray-300 text-sm">Plan price</span>
                  <span className="text-foreground">$ {plan.price}</span>
                </div>
                {/* <a href="#" className="text-blue-500 text-xs hover:underline">
                    Have a promo code?
                  </a> */}

                <div className="border-t border-neutral-800 my-6"></div>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-foreground font-medium">Total</span>
                  <span className="text-foreground text-lg font-medium">$ {plan.price}</span>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-foreground text-background font-medium py-3 rounded-lg hover:bg-foreground/90 cursor-pointer transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}