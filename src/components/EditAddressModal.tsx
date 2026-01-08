"use client";

import { useState, useEffect, useRef } from "react";
import { Country, State, City } from "country-state-city";
import { toast } from "react-hot-toast";

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

  const isEdit = Boolean(address);

  /* RESET FORM ON OPEN */
  useEffect(() => {
    if (!open) return;

    setForm({
      address1: address?.Address1 ?? "",
      address2: address?.Address2 ?? "",
      city: address?.city ?? "",
      state: address?.state ?? "",
      country: address?.country ?? "",
      postalCode: address?.zipCode ?? "",
    });

    const countryISO = Country.getAllCountries().find(
      (c) => c.name.toLowerCase() === address?.country?.toLowerCase()
    )?.isoCode;

    const stateISO = State.getStatesOfCountry(countryISO || "").find(
      (s) => s.name.toLowerCase() === address?.state?.toLowerCase()
    )?.isoCode;

    setSelectedCountry(countryISO || "");
    setSelectedState(stateISO || "");
  }, [open, address]);

  /* CLICK OUTSIDE HANDLER */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        countryRef.current?.contains(t) ||
        stateRef.current?.contains(t) ||
        cityRef.current?.contains(t)
      ) {
        return;
      }
      setCountryOpen(false);
      setStateOpen(false);
      setCityOpen(false);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!open) return null;

  const save = async () => {
    const payload = {
      Address1: form.address1,
      Address2: form.address2 || null,
      city: form.city,
      state:
        State.getStatesOfCountry(selectedCountry).find(
          (s) => s.isoCode === selectedState
        )?.name || "",
      country:
        Country.getAllCountries().find(
          (c) => c.isoCode === selectedCountry
        )?.name || "",
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
      location.reload();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const baseInput =
    "w-full px-4 py-2 rounded-xl bg-white/80 dark:bg-neutral-800/60 border border-black/10 dark:border-white/15 text-sm outline-none";

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
        "
      >
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
        <div className="px-6 py-6 space-y-4">
          <input
            value={form.address1}
            onChange={(e) =>
              setForm({ ...form, address1: e.target.value })
            }
            placeholder="Address Line 1"
            className={baseInput}
          />

          <input
            value={form.address2}
            onChange={(e) =>
              setForm({ ...form, address2: e.target.value })
            }
            placeholder="Address Line 2"
            className={baseInput}
          />

          {/* COUNTRY */}
          <div ref={countryRef} className="relative">
            <div
              className={baseInput + " cursor-pointer flex justify-between"}
              onClick={() => {
                setCountryOpen(!countryOpen);
                setStateOpen(false);
                setCityOpen(false);
              }}
            >
              <span>
                {selectedCountry
                  ? Country.getAllCountries().find(
                      (c) => c.isoCode === selectedCountry
                    )?.name
                  : "Select Country"}
              </span>
            </div>

            {countryOpen && (
              <div className="absolute z-50 mt-1 w-full rounded-xl bg-background border border-black/10 max-h-52 overflow-auto">
                <input
                  value={countrySearch}
                  onChange={(e) => setCountrySearch(e.target.value)}
                  placeholder="Search country..."
                  className="w-full px-3 py-2 border-b outline-none text-sm"
                />
                {Country.getAllCountries()
                  .filter((c) =>
                    c.name
                      .toLowerCase()
                      .includes(countrySearch.toLowerCase())
                  )
                  .map((c) => (
                    <div
                      key={c.isoCode}
                      onClick={() => {
                        setSelectedCountry(c.isoCode);
                        setSelectedState("");
                        setCountryOpen(false);
                        setCountrySearch("");
                      }}
                      className="px-4 py-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 cursor-pointer"
                    >
                      {c.name}
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* STATE */}
          <div ref={stateRef} className="relative">
            <div
              className={`${baseInput} cursor-pointer flex justify-between ${
                !selectedCountry && "opacity-50 cursor-not-allowed"
              }`}
              onClick={() => {
                if (!selectedCountry) return;
                setStateOpen(!stateOpen);
                setCountryOpen(false);
                setCityOpen(false);
              }}
            >
              <span>
                {selectedState
                  ? State.getStatesOfCountry(selectedCountry).find(
                      (s) => s.isoCode === selectedState
                    )?.name
                  : "Select State"}
              </span>
            </div>

            {stateOpen && (
              <div className="absolute z-50 mt-1 w-full rounded-xl bg-background border border-black/10 max-h-52 overflow-auto">
                <input
                  value={stateSearch}
                  onChange={(e) => setStateSearch(e.target.value)}
                  placeholder="Search state..."
                  className="w-full px-3 py-2 border-b outline-none text-sm"
                />
                {State.getStatesOfCountry(selectedCountry)
                  .filter((s) =>
                    s.name
                      .toLowerCase()
                      .includes(stateSearch.toLowerCase())
                  )
                  .map((s) => (
                    <div
                      key={s.isoCode}
                      onClick={() => {
                        setSelectedState(s.isoCode);
                        setForm({ ...form, city: "" });
                        setStateOpen(false);
                        setStateSearch("");
                      }}
                      className="px-4 py-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 cursor-pointer"
                    >
                      {s.name}
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* CITY */}
          <div ref={cityRef} className="relative">
            <input
              value={form.city}
              disabled={!selectedState}
              onFocus={() => setCityOpen(true)}
              onChange={(e) =>
                setForm({ ...form, city: e.target.value })
              }
              placeholder="City"
              className={baseInput}
            />

            {cityOpen && selectedState && (
              <div className="absolute z-50 mt-1 w-full rounded-xl bg-background border border-black/10 max-h-52 overflow-auto">
                {City.getCitiesOfState(
                  selectedCountry,
                  selectedState
                )
                  .filter((c) =>
                    c.name
                      .toLowerCase()
                      .includes(form.city.toLowerCase())
                  )
                  .map((c) => (
                    <div
                      key={c.name}
                      onClick={() => {
                        setForm({ ...form, city: c.name });
                        setCityOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 cursor-pointer"
                    >
                      {c.name}
                    </div>
                  ))}
              </div>
            )}
          </div>

          <input
            value={form.postalCode}
            onChange={(e) =>
              setForm({ ...form, postalCode: e.target.value })
            }
            placeholder="Postal Code"
            className={baseInput}
          />
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={save}
            className="rounded-xl bg-linear-to-r from-blue-500 to-cyan-500 px-5 py-2 text-sm text-white"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
