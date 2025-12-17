import { useEffect, useMemo, useRef, useState } from "react";

import { Button } from "../components/common/Button/Button";
import { SelectField } from "../components/common/Select/SelectField";
import { TextInput } from "../components/common/TextInput/TextInput";
import { TextArea } from "../components/common/TextArea/TextArea";

import { referenceService } from "../services/referenceService";
import { recipeService } from "../services/recipeService";

export const AddRecipePage = () => {
  const fileInputRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isLoadingRefs, setIsLoadingRefs] = useState(true);
  const [refsError, setRefsError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [ingredientsRef, setIngredientsRef] = useState([]);

  const [thumb, setThumb] = useState(null); // File | null

  const [form, setForm] = useState({
    title: "",
    categoryId: "",
    areaId: "",
    instructions: "",
    cookingTimeMin: 10,
  });

  const [ingredientDraft, setIngredientDraft] = useState({
    ingredientId: "",
    measure: "",
  });

  // list for UI; on submit we stringify to `ingredients` field
  const [ingredients, setIngredients] = useState([]); // { ingredientId, label, measure }

  // -------- Load reference data --------
  useEffect(() => {
    let alive = true;

    const loadRefs = async () => {
      setIsLoadingRefs(true);
      setRefsError("");

      try {
        const [cats, ars, ings] = await Promise.all([
          referenceService.getCategories(),
          referenceService.getAreas(),
          referenceService.getIngredients(),
        ]);

        if (!alive) return;

        setCategories(Array.isArray(cats) ? cats : []);
        setAreas(Array.isArray(ars) ? ars : []);
        setIngredientsRef(Array.isArray(ings) ? ings : []);
      } catch (e) {
        if (!alive) return;
        setRefsError(e instanceof Error ? e.message : "Failed to load reference data");
      } finally {
        if (!alive) return;
        setIsLoadingRefs(false);
      }
    };

    loadRefs();
    return () => {
      alive = false;
    };
  }, []);

  // -------- Map to Select options (adjust key names if your models differ) --------
  const categoryOptions = useMemo(
    () =>
      categories.map((c) => ({
        value: c.id,
        label: c.name, // change if your model uses `title`
      })),
    [categories]
  );

  const areaOptions = useMemo(
    () =>
      areas.map((a) => ({
        value: a.id,
        label: a.name,
      })),
    [areas]
  );

  const ingredientOptions = useMemo(
    () =>
      ingredientsRef.map((i) => ({
        value: i.id,
        label: i.name,
      })),
    [ingredientsRef]
  );

  const ingredientLabelById = useMemo(() => {
    const map = new Map();
    for (const i of ingredientsRef) map.set(i.id, i.name);
    return map;
  }, [ingredientsRef]);

  // -------- Thumb preview --------
  const previewUrl = useMemo(() => {
    if (!thumb) return null;
    return URL.createObjectURL(thumb);
  }, [thumb]);

  const removeThumb = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setThumb(null);
  };

  // -------- Handlers --------
  const onFieldChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onDraftChange = (e) => {
    const { name, value } = e.target;
    setIngredientDraft((p) => ({ ...p, [name]: value }));
  };

  const acceptThumb = (f) => {
    setSubmitError("");
    if (!f) return;

    if (!f.type?.startsWith("image/")) return setSubmitError("Please select an image file.");

    const maxMb = 10;
    if (f.size > maxMb * 1024 * 1024) return setSubmitError(`Image is too large. Max ${maxMb}MB.`);

    setThumb(f);
  };

  const onThumbInput = (e) => {
    acceptThumb(e.target.files?.[0]);
    e.currentTarget.value = "";
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    acceptThumb(e.dataTransfer.files?.[0]);
  };

  const decTime = () =>
    setForm((p) => ({ ...p, cookingTimeMin: Math.max(0, p.cookingTimeMin - 5) }));
  const incTime = () =>
    setForm((p) => ({ ...p, cookingTimeMin: Math.min(600, p.cookingTimeMin + 5) }));

  const addIngredient = () => {
    setSubmitError("");

    const { ingredientId, measure } = ingredientDraft;

    if (!ingredientId) return setSubmitError("Select an ingredient.");
    if (!measure.trim()) return setSubmitError("Enter measure (e.g. 100g, 2 cups).");

    const exists = ingredients.some((x) => x.ingredientId === ingredientId);
    if (exists) return setSubmitError("This ingredient is already added.");

    const label = ingredientLabelById.get(ingredientId) ?? ingredientId;

    setIngredients((p) => [...p, { ingredientId, label, measure: measure.trim() }]);
    setIngredientDraft({ ingredientId: "", measure: "" });
  };

  const removeIngredientAt = (idx) => {
    setIngredients((p) => p.filter((_, i) => i !== idx));
  };

  const clearAll = () => {
    setForm({
      title: "",
      categoryId: "",
      areaId: "",
      instructions: "",
      cookingTimeMin: 10,
    });
    setIngredientDraft({ ingredientId: "", measure: "" });
    setIngredients([]);
    removeThumb();
    setSubmitError("");
  };

  const validate = () => {
    if (!form.title.trim() || form.title.trim().length < 3) return "Title must be at least 3 chars.";
    if (!form.categoryId) return "Category is required.";
    if (!form.areaId) return "Area is required.";
    if (!form.instructions.trim() || form.instructions.trim().length < 10)
      return "Instructions must be at least 10 chars.";
    if (ingredients.length === 0) return "Add at least one ingredient.";
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const err = validate();
    if (err) return setSubmitError(err);

    setIsSubmitting(true);
    try {
      // IMPORTANT: your BE expects `ingredients` as a JSON STRING
      const ingredientsString = JSON.stringify(
        ingredients.map((x) => ({
          ingredientId: x.ingredientId,
          measure: x.measure,
        }))
      );

      await recipeService.createRecipe({
        title: form.title.trim(),
        categoryId: form.categoryId,
        areaId: form.areaId,
        instructions: form.instructions.trim(),
        time: `${form.cookingTimeMin} mins`,
        ingredients: ingredientsString,
        thumb: thumb ?? undefined,
      });

      clearAll();
      alert("Recipe published ✅");
    } catch (error) {
      // axios-style error safety
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Publish failed";
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="mb-8">
        <div className="text-xs font-medium tracking-wide text-neutral-400">HOME / ADD RECIPE</div>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-neutral-900">ADD RECIPE</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-500">
          Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us.
        </p>
      </div>

      {refsError ? (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {refsError}
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-10 lg:grid-cols-[420px_1fr]">
        {/* LEFT: Upload */}
        <div>
          <div
            className={[
              "rounded-3xl border-2 border-dashed p-6 transition",
              isDragging ? "border-neutral-400 bg-neutral-50" : "border-neutral-200 bg-white",
            ].join(" ")}
            onDragEnter={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDragging(true);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDragging(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDragging(false);
            }}
            onDrop={onDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onThumbInput}
            />

            <div className="flex min-h-[360px] flex-col items-center justify-center">
              {!thumb ? (
                <>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-neutral-200 bg-white shadow-sm">
                    <svg className="h-5 w-5 text-neutral-400">
                      <use href="/sprite.svg#icon-camera" />
                    </svg>
                  </div>

                  <button
                    type="button"
                    className="mt-4 text-sm font-medium text-neutral-700 underline underline-offset-4 hover:text-neutral-900"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Upload a photo
                  </button>

                  <div className="mt-2 text-xs text-neutral-400">or drag & drop</div>
                </>
              ) : (
                <div className="w-full">
                  <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
                    <img src={previewUrl} alt="Thumb preview" className="h-[320px] w-full object-cover" />
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-neutral-900">{thumb.name}</div>
                      <div className="text-xs text-neutral-500">{(thumb.size / 1024 / 1024).toFixed(2)} MB</div>
                    </div>

                    <Button type="button" variant="light" label="Remove" onClick={removeThumb} disabled={isSubmitting} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: Fields */}
        <div className="space-y-8">
          {/* Title */}
          <div>
            <div className="mb-4 text-xl font-bold leading-none text-neutral-900">
              THE NAME OF THE RECIPE
            </div>

            <TextInput
              id="title"
              name="title"
              value={form.title}
              onChange={onFieldChange}
              placeholder="Enter the name"
              maxLength={100}
              disabled={isSubmitting}
            />
          </div>
          {/* Category + Cooking time */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <div className="mb-4 text-xl font-bold leading-none text-neutral-900">CATEGORY</div>
              <SelectField
                id="categoryId"
                name="categoryId"
                value={form.categoryId}
                onChange={onFieldChange}
                options={categoryOptions}
                placeholder={isLoadingRefs ? "Loading..." : "Select a category"}
                disabled={isLoadingRefs || isSubmitting}
              />
            </div>

            <div>
              <div className="mb-4 text-xl font-bold leading-none text-neutral-900">COOKING TIME</div>

              <div className="mx-2 flex items-center gap-4">
                <button
                  type="button"
                  onClick={decTime}
                  disabled={isSubmitting}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-lg hover:bg-neutral-50 disabled:opacity-60"
                >
                  −
                </button>

                <div className="text-sm text-neutral-500">
                  <span className="font-semibold text-neutral-900">{form.cookingTimeMin}</span> min
                </div>

                <button
                  type="button"
                  onClick={incTime}
                  disabled={isSubmitting}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-lg hover:bg-neutral-50 disabled:opacity-60"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Area */}
          <div>
            <div className="mb-4 text-xl font-bold leading-none text-neutral-900">AREA</div>
            <SelectField
              id="areaId"
              name="areaId"
              value={form.areaId}
              onChange={onFieldChange}
              options={areaOptions}
              placeholder={isLoadingRefs ? "Loading..." : "Area"}
              disabled={isLoadingRefs || isSubmitting}
            />
          </div>

          {/* Ingredients */}
          <div>
            <div className="mb-4 text-xl font-bold leading-none text-neutral-900">INGREDIENTS</div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_220px]">
              <SelectField
                id="ingredientId"
                name="ingredientId"
                value={ingredientDraft.ingredientId}
                onChange={onDraftChange}
                options={ingredientOptions}
                placeholder={isLoadingRefs ? "Loading..." : "Add the ingredient"}
                disabled={isLoadingRefs || isSubmitting}
              />

              <TextInput
                id="measure"
                name="measure"
                value={ingredientDraft.measure}
                onChange={onDraftChange}
                placeholder="Enter quantity"
                maxLength={60}
                disabled={isSubmitting}
              />
            </div>

            <div className="mx-2 mt-3">
              <Button
                type="button"
                variant="light"
                label="ADD INGREDIENT +"
                onClick={addIngredient}
                disabled={isLoadingRefs || isSubmitting}
              />
            </div>

            {ingredients.length > 0 && (
              <div className="mx-2 mt-4 space-y-2">
                {ingredients.map((ing, idx) => (
                  <div
                    key={`${ing.ingredientId}-${idx}`}
                    className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white px-4 py-3"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-neutral-900">{ing.label}</div>
                      <div className="text-xs text-neutral-500">{ing.measure}</div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeIngredientAt(idx)}
                      disabled={isSubmitting}
                      className="rounded-full border border-neutral-200 p-2 hover:bg-neutral-50 disabled:opacity-60"
                      aria-label="Remove ingredient"
                    >
                      <svg className="h-4 w-4">
                        <use href="/sprite.svg#icon-trash" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Instructions */}
          <div>
            <div className="mb-4 text-xl font-bold leading-none text-neutral-900">
              RECIPE PREPARATION
            </div>
            <TextArea
              id="instructions"
              name="instructions"
              value={form.instructions}
              onChange={onFieldChange}
              placeholder="Enter recipe"
              maxLength={1000}
              disabled={isSubmitting}
            />
          </div>

          {/* Submit error */}
          {submitError ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </div>
          ) : null}

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={clearAll}
              disabled={isSubmitting}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 disabled:opacity-60"
              aria-label="Clear form"
              title="Clear"
            >
              <svg className="h-5 w-5">
                <use href="/sprite.svg#icon-trash" />
              </svg>
            </button>

            <Button type="submit" variant="dark" label={isSubmitting ? "PUBLISHING..." : "PUBLISH"} disabled={isSubmitting || isLoadingRefs} />
          </div>
        </div>
      </form>
    </div>
  );
};
