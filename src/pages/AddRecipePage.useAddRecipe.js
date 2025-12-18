import { useEffect, useMemo, useRef, useState } from "react";
import { referenceService } from "../services/referenceService";
import { recipeService } from "../services/recipeService";

export const useAddRecipe = () => {
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

  // -------- Options for selects --------
  const categoryOptions = useMemo(
    () => categories.map((c) => ({ value: c.id, label: c.name })),
    [categories]
  );

  const areaOptions = useMemo(() => areas.map((a) => ({ value: a.id, label: a.name })), [areas]);

  const ingredientOptions = useMemo(
    () => ingredientsRef.map((i) => ({ value: i.id, label: i.name })),
    [ingredientsRef]
  );

const ingredientMetaById = useMemo(() => {
  const map = new Map();
  for (const i of ingredientsRef) {
    map.set(i.id, { name: i.name, img: i.img || i.image || i.thumb || "" });
  }
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

  const onDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
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

  const meta = ingredientMetaById.get(ingredientId);
  const label = meta?.name ?? ingredientId;
  const img = meta?.img ?? "";

    setIngredients((p) => [...p, { ingredientId, label, img, measure: measure.trim() }]);
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

  return {
    // state
    fileInputRef,
    isDragging,
    isSubmitting,
    isLoadingRefs,
    refsError,
    submitError,
    thumb,
    previewUrl,
    form,
    ingredientDraft,
    ingredients,

    // options
    categoryOptions,
    areaOptions,
    ingredientOptions,

    // handlers
    setSubmitError,
    onFieldChange,
    onDraftChange,
    onThumbInput,
    onDrop,
    onDragEnter,
    onDragOver,
    onDragLeave,
    removeThumb,
    decTime,
    incTime,
    addIngredient,
    removeIngredientAt,
    clearAll,
    onSubmit,
  };
};
