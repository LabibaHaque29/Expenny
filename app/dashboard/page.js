'use client'

import Login from "@/components/Login";
import SubscriptionForm from "@/components/SubscriptionForm";
import SubscriptionsDisplay from "@/components/SubscriptionsDisplay";
import SubscriptionSummary from "@/components/SubscriptionSummary";
import { useAuth } from "@/context/AuthContext";
import { Suspense, useState } from "react";

const blankSubscription = {
    name: '',
    category: 'Web Services',
    cost: '',
    currency: 'USD',
    billingFrequency: 'Monthly',
    nextBillingData: '',
    paymentMethod: 'Credit Card',
    startDate: '',
    renewalType: '',
    notes: '',
    status: 'Active'
}


export default function DashboardPage() {

    const [isAddEntry, setIsAddEntry] = useState(false)
    const [formData, setFormData] = useState(blankSubscription)
    const { handleDeleteSubscription, userData, currentUser, loading } = useAuth()
    const isAuthenticated = !!currentUser
    const [editIndex, setEditIndex] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);


    console.log("Auth state:", { currentUser, loading, userData });


    function handleResetEditState() {
        setEditIndex(null);
        setFormData(blankSubscription);
    }

    function handleChangeInput(e) {
        const newData = {
            ...formData,
            [e.target.name]: e.target.value
        }
        setFormData(newData)
    }


    function handleEditSubscription(index) {
        const data = userData.subscriptions.find((val, valIndex) => {
            return valIndex === index
        })
        setFormData(data)
        // Remove this line: handleDeleteSubscription(index)
        setEditIndex(index)
        setIsModalOpen(true)

    }

    function handleResetForm() {
        setFormData(blankSubscription)
    }

    function handleToggleInput() {
        handleResetEditState()
        setIsModalOpen(true)
    }

    if (loading) {
        return (
            <p>Loading....</p>
        )
    }

    if (!isAuthenticated) {
        return (
            <Suspense fallback={<p>Loading...</p>}>
                <Login />
            </Suspense>
        )
    }

    return (
        <>
            <SubscriptionSummary />
            <SubscriptionsDisplay
                handleEditSubscription={handleEditSubscription}
                handleShowInput={handleToggleInput}
                handleResetEditState={handleResetEditState}
            />
                {isModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                        <button 
                            className="modal-close-btn" 
                            onClick={() => {
                            setIsModalOpen(false);
                            setEditIndex(null);
                            setFormData(blankSubscription);
                            }}
                        >
                            ×
                        </button>
                        <SubscriptionForm
                            handleResetForm={handleResetForm}
                            closeInput={() => {
                            setIsModalOpen(false);
                            setEditIndex(null);
                            setFormData(blankSubscription);
                            }}
                            formData={formData}
                            handleChangeInput={handleChangeInput}
                            editIndex={editIndex}
                        />
                        </div>
                    </div>
                )}
        </>
    );
}