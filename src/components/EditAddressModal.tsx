"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { Country, State, City } from "country-state-city";
import { ChevronDown } from "lucide-react";


export function EditAddressModal({
  open,
  onClose,
  address,
}: {
  open: boolean;
  onClose: () => void;
  address: any | null;
}) {
  const [form, setForm] = useState({
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });


  const [countryOpen, setCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");

  const [stateSearch, setStateSearch] = useState("");
  const [stateOpen, setStateOpen] = useState(false);
  
  const [cityOpen, setCityOpen] = useState(false);
  const [citySearch, setCitySearch] = useState("");
  const [showCities, setShowCities] = useState(false);

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

  const isEdit = Boolean(address);

  // 🔑 RESET FORM WHEN OPEN
  useEffect(() => {
    if (open) {
      setForm({
        address1: address?.Address1 ?? "",
        address2: address?.Address2 ?? "",
        city: address?.city ?? "",
        state: address?.state ?? "",
        country: address?.country ?? "",
        postalCode: address?.zipCode ?? "",
      });
    }
  }, [open, address]);

  if (!open) return null;

  const save = async () => {
    const payload = {
      Address1: form.address1,
      Address2: form.address2 || null,
      city: form.city,
      state: form.state,
      country: form.country,
      zipCode: form.postalCode,
    };

    try {
      const res = await fetch("/api/user/address", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to save address");
        return;
      }

      toast.success(isEdit ? "Address updated" : "Address added");
      onClose();
      location.reload(); // keep your current flow
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative w-full max-w-lg rounded-3xl
          border border-white/20
          bg-white/70 dark:bg-neutral-900/60
          backdrop-blur-xl
          shadow-[0_20px_60px_rgba(0,0,0,0.4)]
          dark:shadow-[0_20px_60px_rgba(0,0,0,0.8)]
        "
      >
        <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10 pointer-events-none" />

        {/* HEADER */}
        <div className="px-6 pt-6 pb-4 border-b border-white/10">
          <h2 className="text-xl font-semibold">
            {isEdit ? "Edit Address" : "Add Address"}
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage your address information.
          </p>
        </div>

        {/* BODY */}
        <div className="px-6 py-6 space-y-5">
          <div>
            {[
              ["Address Line 1", "address1"],
              ["Address Line 2", "address2"],
              ["Postal Code", "postalCode"],
            ].map(([label, key]) => (
              <div key={key} className="space-y-1">
                <label className="text-xs uppercase tracking-wide text-muted-foreground">
                  {label}
                </label>
                <input
                  value={(form as any)[key]}
                  onChange={(e) =>
                    setForm({ ...form, [key]: e.target.value })
                  }
                  className="
                  w-full rounded-xl
                  border border-black/10 dark:border-white/15
                  bg-white/80 dark:bg-neutral-800/60
                  px-4 py-2 text-sm text-foreground
                  outline-none
                  focus:ring-2 focus:ring-cyan-400/50
                "
                />
              </div>
            ))}
          </div>
          {/* COUNTRY */}
          <div className="space-y-1 relative" ref={countryRef}>
            <label className="text-xs uppercase tracking-wide text-muted-foreground">
              Country
            </label>

            <button
              type="button"
              onClick={() => setCountryOpen((p) => !p)}
              className="w-full flex justify-between items-center rounded-xl border border-black/10 dark:border-white/15 bg-white/80 dark:bg-neutral-800/60 px-4 py-2 text-sm"
            >
              <span>
                {form.country || "Select country"}
              </span>
              <span
                className={`transition-transform ${countryOpen ? "rotate-180" : ""
                  }`}
              >
                <ChevronDown />
              </span>
            </button>

            {countryOpen && (
              <div className="absolute z-30 mt-1 w-full rounded-xl border border-white/15 bg-background shadow-xl">
                <input
                  placeholder="Search country..."
                  value={countrySearch}
                  onChange={(e) => setCountrySearch(e.target.value)}
                  className="w-full px-3 py-2 border-b border-white/10 bg-transparent outline-none text-sm"
                />

                <ul className="max-h-40 overflow-auto">
                  {Country.getAllCountries()
                    .filter((c) =>
                      c.name.toLowerCase().includes(countrySearch.toLowerCase())
                    )
                    .map((c) => (
                      <li
                        key={c.isoCode}
                        onClick={() => {
                          setForm({ ...form, country: c.isoCode, state: "", city: "" });
                          setCountryOpen(false);
                          setCountrySearch("");
                        }}
                        className="px-4 py-2 cursor-pointer hover:bg-neutral-800/40"
                      >
                        {c.name}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
          {/* STATE */}
          <div className="space-y-1 relative" ref={stateRef}>
            <label className="text-xs uppercase tracking-wide text-muted-foreground">
              State
            </label>

            <button
              type="button"
              disabled={!form.country}
              onClick={() => setStateOpen((p) => !p)}
              className="w-full flex justify-between items-center rounded-xl border border-black/10 dark:border-white/15 bg-white/80 dark:bg-neutral-800/60 px-4 py-2 text-sm disabled:cursor-not-allowed"
            >
              <span>
                {form.state || "Select state"}
              </span>
              <span
                className={`transition-transform ${stateOpen ? "rotate-180" : ""
                  }`}
              >
                <ChevronDown />
              </span>
            </button>

            {stateOpen && (
              <div className="absolute z-30 mt-1 w-full rounded-xl border border-white/15 bg-background shadow-xl">
                <input
                  placeholder="Search state..."
                  value={stateSearch}
                  onChange={(e) => setStateSearch(e.target.value)}
                  className="w-full px-3 py-2 border-b border-white/10 bg-transparent outline-none text-sm"
                />

                <ul className="max-h-40 overflow-auto">
                  {State.getStatesOfCountry(form.country)
                    .filter((s) =>
                      s.name.toLowerCase().includes(stateSearch.toLowerCase())
                    )
                    .map((s) => (
                      <li
                        key={s.isoCode}
                        onMouseDown={() => {
                          setForm({ ...form, state: s.name, city: "" });
                          setStateOpen(false);
                          setStateSearch("");
                        }}
                        className="px-4 py-2 cursor-pointer hover:bg-neutral-800/40"
                      >
                        {s.name}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>

          {/* CITY */}
          <div className="space-y-1 relative" ref={cityRef}>
            <label className="text-xs uppercase tracking-wide text-muted-foreground">
              City
            </label>

            <input
              value={form.city}
              onChange={(e) => {
                setForm({ ...form, city: e.target.value });
                setCitySearch(e.target.value);
                setShowCities(true);
              }}
              onBlur={() => setTimeout(() => setShowCities(false), 150)}
              disabled={!form.state}
              placeholder="Start typing city..."
              className="w-full rounded-xl border border-black/10 dark:border-white/15 bg-white/80 dark:bg-neutral-800/60 px-4 py-2 text-sm disabled:cursor-not-allowed"
            />

            {showCities && citySearch && (
              <ul className="absolute z-30 mt-1 w-full max-h-40 overflow-auto rounded-xl border border-white/15 bg-background shadow-xl">
                {City.getCitiesOfState(
                  form.country,
                  State.getStatesOfCountry(form.country).find(
                    (s) => s.name === form.state
                  )?.isoCode || ""
                )
                  .filter((c) =>
                    c.name.toLowerCase().includes(citySearch.toLowerCase())
                  )
                  .map((c, i) => (
                    <li
                      key={i}
                      onMouseDown={() => {
                        setForm({ ...form, city: c.name });
                        setShowCities(false);
                      }}
                      className="px-4 py-2 cursor-pointer hover:bg-neutral-800/40"
                    >
                      {c.name}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="cursor-pointer rounded-xl px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:text-foreground"
          >
            Cancel
          </button>
          <button
            onClick={save}
            className="cursor-pointer rounded-xl bg-linear-to-r from-blue-500 to-cyan-500 px-5 py-2 text-sm font-medium text-white shadow-lg"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
