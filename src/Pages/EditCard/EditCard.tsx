import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import { FloatingLabel, Button } from "flowbite-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { TCard } from "../../Types/TCard";
import { toast } from "react-toastify";
import { CreateCardSchema } from "../../validations/CreateCardSchema";


const EditCard = () => {

    const [card, setCard] = useState<TCard>();
    const { id } = useParams<{ id: string }>();

    const nav = useNavigate();

    const getCardData = async () => {
        try {
            axios.defaults.headers.common['x-auth-token'] = localStorage.getItem("token");
            const res = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + id);
            setCard(res.data);
        } catch (error) {
            toast.error("Error getting card");
        };
    };

    const initialCardData = {

        title: card?.title,
        subtitle: card?.subtitle,
        description: card?.description,
        phone: card?.phone,
        email: card?.email,
        web: card?.web,
        image: {
            url: card?.image.url,
            alt: card?.image.alt,
        },
        address: {
            state: card?.address.state,
            country: card?.address.country,
            city: card?.address.city,
            street: card?.address.street,
            houseNumber: card?.address.houseNumber,
            zip: card?.address.zip,
        },
    };


    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({
        defaultValues: initialCardData,
        mode: "onChange",
        resolver: joiResolver(CreateCardSchema),
    });

    const onSubmit = async (form: typeof initialCardData) => {
        try {
            axios.defaults.headers.common['x-auth-token'] = localStorage.getItem("token");
            await axios.put("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + id, form);
            toast.success("successfully created");
            nav("/my-cards");
        } catch (error) {
            toast.error("error");
        };
    };

    useEffect(() => {
        if (card) {
            reset(initialCardData);
        }
    }, [card, reset]);

    useEffect(() => {
        getCardData();
    }, [id]);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 m-auto rounded-lg shadow-lg bg-gradient-to-r from-pink-100 to-pink-200 dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800 ">
                <h1 className="pt-20 text-2xl font-bold text-center dark:text-gray-400"> Editing Card Details </h1>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel
                            label={"Title"}
                            defaultValue={card?.title}
                            {...register("title")}
                            variant={"standard"}
                        />
                        <span className="text-sm text-red-800">{errors.title?.message}</span>
                    </div>

                    <div className="flex flex-col">
                        <FloatingLabel
                            label={"Subtitle"}
                            defaultValue={card?.subtitle}
                            {...register("subtitle")}
                            variant={"standard"}
                        />
                        <span className="text-sm text-red-800">{errors.subtitle?.message}</span>
                    </div>
                </div>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">

                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-center text-gray-900 dark:text-green-500">
                            Description</label>

                        <textarea id="message" defaultValue={card?.description} {...register("description")}
                            className="block p-2.5 w-[300px] h-[200px] m-auto text-sm text-gray-900 bg-pink-50
                        rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black
                        dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
                            placeholder="Write your card description here...">
                        </textarea>
                        <span className="text-sm text-red-800">{errors.description?.message}</span>
                    </div>
                </div>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel
                            label={"Phone"}
                            defaultValue={card?.phone}
                            {...register("phone")}
                            variant={"standard"}
                        />
                        <span className="text-sm text-red-800">{errors.phone?.message}</span>
                    </div>

                    <div className="flex flex-col">
                        <FloatingLabel
                            label={"Email"}
                            defaultValue={card?.email}
                            {...register("email")}
                            variant={"standard"}
                        />
                        <span className="text-sm text-red-800">{errors.email?.message}</span>
                    </div>
                </div>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel
                            label={"Web"}
                            defaultValue={card?.web}
                            {...register("web")}
                            variant={"standard"}
                        />
                        <span className="text-sm text-red-800">{errors.web?.message}</span>
                    </div>

                    <div className="flex flex-col">
                        <FloatingLabel
                            label={"Image URL"}
                            defaultValue={card?.image.url}
                            {...register("image.url")}
                            variant={"standard"}
                        />
                        <span className="text-sm text-red-800">{errors.image?.url?.message}</span>
                    </div>
                </div>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel
                            label={"Image ALT"}
                            defaultValue={card?.image.alt}
                            {...register("image.url")}
                            variant={"standard"}
                        />
                        <span className="text-sm text-red-800">{errors.image?.alt?.message}</span>
                    </div>

                    <div className="flex flex-col">
                        <FloatingLabel
                            label={"Country"}
                            defaultValue={card?.address.country}
                            {...register("address.country")}
                            variant={"standard"}
                        />
                        <span className="text-sm text-red-800">{errors.address?.country?.message}</span>
                    </div>
                </div>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel
                            label={"City"}
                            defaultValue={card?.address.city}
                            {...register("address.city")}
                            variant={"standard"}
                        />
                        <span className="text-sm text-red-800">{errors.address?.city?.message}</span>
                    </div>

                    <div className="flex flex-col">
                        <FloatingLabel
                            label={"State"}
                            defaultValue={card?.address.state}
                            {...register("address.state")}
                            variant={"standard"}
                        />
                        <span className="text-sm text-red-800">{errors.address?.state?.message}</span>
                    </div>
                </div>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel
                            label={"Street"}
                            defaultValue={card?.address.street}
                            {...register("address.street")}
                            variant={"standard"}
                        />
                        <span className="text-sm text-red-800">{errors.address?.street?.message}</span>
                    </div>

                    <div className="flex flex-col">
                        <FloatingLabel
                            label={"HouseNumber"}
                            defaultValue={card?.address.houseNumber}
                            {...register("address.houseNumber")}
                            variant={"standard"}
                        />
                        <span className="text-sm text-red-800">{errors.address?.houseNumber?.message}</span>
                    </div>
                </div>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel
                            label={"ZIP"}
                            defaultValue={card?.address.zip}
                            {...register("address.zip")}
                            variant={"standard"}
                        />
                        <span className="text-sm text-red-800">{errors.address?.zip?.message}</span>
                    </div>
                </div>

                <Button type="submit" disabled={!isValid} className="m-auto w-[20%] bg-pink-400  dark:border-black
                                dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800">Update Changes</Button>
            </form>
        </>
    )
};

export default EditCard;