"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Input, Textarea, Select, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { FeatureTags } from "@/components/dashboard/feature-tags";
import { ImageUploader, type ManagedImage, type ExistingImage } from "@/components/dashboard/image-uploader";
import { NEIGHBORHOODS } from "@/lib/constants";
import { createProperty, updateProperty } from "@/lib/actions/property-actions";
import { uploadPropertyImage, deletePropertyImage, setCoverImage } from "@/lib/actions/media-actions";
import type { City, PropertyWithImages, PropertyType, PropertyStatus } from "@/lib/types";

const LocationPicker = dynamic(() => import("./location-picker"), {
  ssr: false,
  loading: () => <div className="w-full h-[300px] bg-bg-elevated animate-pulse border border-border" />,
});

type Props = {
  property?: PropertyWithImages;
};

export function PropertyForm({ property }: Props) {
  const isEdit = !!property;

  const [name, setName] = useState(property?.name ?? "");
  const [city, setCity] = useState<string>(property?.city ?? "");
  const [neighborhood, setNeighborhood] = useState(property?.neighborhood ?? "");
  const [address, setAddress] = useState(property?.fullAddress ?? "");
  const [type, setType] = useState(property?.type ?? "sale");
  const [price, setPrice] = useState(property?.priceDisplay ?? "");
  const [bedrooms, setBedrooms] = useState(String(property?.bedrooms ?? 3));
  const [bathrooms, setBathrooms] = useState(String(property?.bathrooms ?? 2));
  const [sqft, setSqft] = useState(property?.sqft ? String(property.sqft) : "");
  const [yearInfo, setYearInfo] = useState("");
  const [description, setDescription] = useState(property?.description ?? "");
  const [features, setFeatures] = useState<string[]>(property?.features ?? []);
  const [lat, setLat] = useState(property?.lat ? String(property.lat) : "");
  const [lng, setLng] = useState(property?.lng ? String(property.lng) : "");
  const [status, setStatus] = useState(property?.status ?? "draft");
  const [featured, setFeatured] = useState(property?.featured ?? true);
  const [allowInquiries, setAllowInquiries] = useState(property?.allowInquiries ?? true);
  const [priceOnRequest, setPriceOnRequest] = useState(property?.priceOnRequest ?? false);
  const [images, setImages] = useState<ManagedImage[]>(() => {
    if (!property?.images) return [];
    return property.images.map((img): ExistingImage => ({
      kind: "existing",
      id: img.id,
      url: img.url,
      storagePath: img.storagePath,
      isCover: img.isCover,
    }));
  });
  const [initialImageIds] = useState(() => new Set(property?.images?.map((i) => i.id) ?? []));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const neighborhoods = city ? NEIGHBORHOODS[city as City] ?? [] : [];

  async function handleSave(publishStatus: string) {
    if (!name || !city || !neighborhood || !address || !description || !sqft) {
      setError("Lütfen tüm zorunlu alanları doldurun.");
      return;
    }
    setError("");
    setSaving(true);

    try {
      const data = {
        name,
        city: city as City,
        neighborhood,
        fullAddress: address,
        type: type as PropertyType,
        price: parseFloat(price.replace(/[^0-9.]/g, "")) || 0,
        priceDisplay: price,
        priceNote: type === "rent" ? "/month" : null,
        currency: price.includes("₺") ? "TRY" as const : "USD" as const,
        bedrooms: parseInt(bedrooms),
        bathrooms: parseInt(bathrooms),
        sqft: parseInt(sqft),
        yearBuilt: null,
        yearRenovated: null,
        lat: lat ? parseFloat(lat) : null,
        lng: lng ? parseFloat(lng) : null,
        description,
        features,
        status: publishStatus as PropertyStatus,
        featured,
        allowInquiries,
        priceOnRequest,
        agentName: "Attila Utkucan",
        agentTitle: "Founder & Agent",
      };

      let propertyId: string;

      if (isEdit && property) {
        await updateProperty(property.id, data);
        propertyId = property.id;
      } else {
        const result = await createProperty(data);
        propertyId = result.id;
      }

      const currentExistingIds = new Set(
        images.filter((i) => i.kind === "existing").map((i) => i.id),
      );
      for (const oldId of initialImageIds) {
        if (!currentExistingIds.has(oldId)) {
          const removed = property?.images?.find((i) => i.id === oldId);
          if (removed) {
            await deletePropertyImage(removed.id, removed.storagePath);
          }
        }
      }

      for (const img of images) {
        if (img.kind === "new") {
          const fd = new FormData();
          fd.append("propertyId", propertyId);
          fd.append("file", img.file);
          fd.append("isCover", String(img.isCover));
          await uploadPropertyImage(fd);
        }
      }

      const coverImg = images.find((i) => i.isCover && i.kind === "existing");
      if (coverImg) {
        await setCoverImage(coverImg.id);
      }
      window.dispatchEvent(new Event("sidebar-refresh"));
      router.push("/dashboard/properties");
      router.refresh();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg || "Mülk kaydedilirken hata oluştu.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      {error && (
        <div className="mb-6 px-4 py-3 border border-rose bg-rose/10 text-[0.85rem] text-rose">
          <strong>Hata:</strong> {error}
        </div>
      )}
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/dashboard/properties"
          className="flex items-center justify-center w-9 h-9 border border-border transition-all duration-300 hover:border-accent"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-text-secondary fill-none stroke-[1.5]">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h2 className="font-display text-2xl font-normal">
            {isEdit ? "Edit Property" : "New Property"}
          </h2>
          <p className="text-[0.78rem] text-text-muted">
            {isEdit ? "Update property details" : "Add a new property to your portfolio"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-6 items-start">
        {/* Left: Form panels */}
        <div className="space-y-6">
          {/* Basic Info */}
          <FormPanel title="Basic Information">
            <FormRow>
              <div className="col-span-2 flex flex-col gap-1.5">
                <Label>Property Name</Label>
                <Input placeholder="e.g. Bosphorus View Penthouse" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </FormRow>
            <FormRow>
              <div className="flex flex-col gap-1.5">
                <Label>City</Label>
                <Select value={city} onChange={(e) => { setCity(e.target.value); setNeighborhood(""); }}>
                  <option value="">Select city</option>
                  <option value="Istanbul">Istanbul</option>
                  <option value="Bodrum">Bodrum</option>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Neighborhood</Label>
                <Select value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)}>
                  <option value="">Select neighborhood</option>
                  {neighborhoods.map((n) => <option key={n} value={n}>{n}</option>)}
                </Select>
              </div>
            </FormRow>
            <FormRow>
              <div className="col-span-2 flex flex-col gap-1.5">
                <Label>Full Address</Label>
                <Input placeholder="e.g. Kuruçeşme Cad. 42, Beşiktaş, Istanbul" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
            </FormRow>
            <FormRow>
              <div className="flex flex-col gap-1.5">
                <Label>Listing Type</Label>
                <Select value={type} onChange={(e) => setType(e.target.value as "sale" | "rent")}>
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Price</Label>
                <Input placeholder="e.g. $1,200,000 or ₺45,000/mo" value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
            </FormRow>
            <FormRow>
              <div className="flex flex-col gap-1.5">
                <Label>Bedrooms</Label>
                <Select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
                  {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}{n === 5 ? "+" : ""}</option>)}
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Bathrooms</Label>
                <Select value={bathrooms} onChange={(e) => setBathrooms(e.target.value)}>
                  {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}{n === 4 ? "+" : ""}</option>)}
                </Select>
              </div>
            </FormRow>
            <FormRow>
              <div className="flex flex-col gap-1.5">
                <Label>Area (sq ft)</Label>
                <Input type="number" placeholder="e.g. 2400" value={sqft} onChange={(e) => setSqft(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Year Built / Renovated</Label>
                <Input placeholder="e.g. 1930 / 2024" value={yearInfo} onChange={(e) => setYearInfo(e.target.value)} />
              </div>
            </FormRow>
            <FormRow>
              <div className="col-span-2 flex flex-col gap-1.5">
                <Label>Description</Label>
                <Textarea placeholder="Write a compelling property description…" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
            </FormRow>
            <FormRow>
              <div className="col-span-2 flex flex-col gap-1.5">
                <Label>Features & Amenities</Label>
                <FeatureTags value={features} onChange={setFeatures} />
              </div>
            </FormRow>
          </FormPanel>

          {/* Images */}
          <FormPanel title="Property Images">
            <ImageUploader images={images} onChange={setImages} />
          </FormPanel>

          {/* Location */}
          <FormPanel title="Konum">
            <LocationPicker lat={lat} lng={lng} onLatChange={setLat} onLngChange={setLng} />
            <FormRow>
              <div className="flex flex-col gap-1.5">
                <Label>Enlem (Latitude)</Label>
                <Input placeholder="ör. 41.0472" value={lat} onChange={(e) => setLat(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Boylam (Longitude)</Label>
                <Input placeholder="ör. 29.0302" value={lng} onChange={(e) => setLng(e.target.value)} />
              </div>
            </FormRow>
          </FormPanel>
        </div>

        {/* Right: Sidebar */}
        <div className="space-y-4">
          {/* Publish */}
          <div className="bg-bg-card border border-border">
            <div className="px-5 py-4 border-b border-border font-display text-[1.05rem]">
              Publish
            </div>
            <div className="p-5">
              <div className="flex flex-col gap-1.5 mb-4">
                <Label>Status</Label>
                <Select value={status} onChange={(e) => setStatus(e.target.value as "draft" | "active" | "sold" | "rented")}>
                  <option value="draft">Draft</option>
                  <option value="active">Active (Published)</option>
                </Select>
              </div>
              {error && (
                <div className="text-[0.78rem] text-rose bg-rose-muted px-3 py-2 mb-3">
                  {error}
                </div>
              )}
              <div className="flex flex-col gap-2.5">
                <Button variant="primary" className="w-full justify-center" onClick={() => handleSave("active")} disabled={saving}>
                  {saving ? "Saving…" : (
                    <>
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none stroke-2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Publish Property
                    </>
                  )}
                </Button>
                <Button variant="outline" className="w-full justify-center" onClick={() => handleSave("draft")} disabled={saving}>
                  Save as Draft
                </Button>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-bg-card border border-border">
            <div className="px-5 py-4 border-b border-border font-display text-[1.05rem]">
              Settings
            </div>
            <div className="p-5 space-y-0">
              <ToggleRow label="Featured" sub="Show on homepage" checked={featured} onChange={setFeatured} />
              <ToggleRow label="Allow Inquiries" sub="Enable contact form" checked={allowInquiries} onChange={setAllowInquiries} />
              <ToggleRow label="Price on Request" sub="Hide price, show 'POA'" checked={priceOnRequest} onChange={setPriceOnRequest} />
            </div>
          </div>

          {/* Agent */}
          <div className="bg-bg-card border border-border">
            <div className="px-5 py-4 border-b border-border font-display text-[1.05rem]">
              Listing Agent
            </div>
            <div className="p-5">
              <Select defaultValue="Attila Utkucan" className="mb-3">
                <option>Attila Utkucan</option>
              </Select>
              <div className="flex justify-between py-2.5 border-b border-border text-[0.78rem]">
                <span className="text-text-muted">Role</span>
                <span className="font-medium">Founder &amp; Agent</span>
              </div>
              <div className="flex justify-between py-2.5 text-[0.78rem]">
                <span className="text-text-muted">Properties</span>
                <span className="font-medium">12 active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-bg-card border border-border">
      <div className="px-5 py-4 border-b border-border font-display text-[1.15rem]">
        {title}
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );
}

function FormRow({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>;
}

function ToggleRow({ label, sub, checked, onChange }: { label: string; sub: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
      <div>
        <div className="text-[0.8rem] text-text-secondary">{label}</div>
        <div className="text-[0.65rem] text-text-muted mt-0.5">{sub}</div>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}
