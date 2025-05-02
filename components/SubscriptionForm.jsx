'use client'

import { useAuth } from "@/context/AuthContext"
import { useState } from "react"

export default function SubscriptionForm(props) {
    const { onSubmit, closeInput, formData, handleChangeInput, handleResetForm } = props
    // const { handleAddSubscription } = useAuth()
    const { handleAddSubscription, handleUpdateSubscription } = useAuth()

    


    function handleFormSumbit(e) {
        e.preventDefault()
            
        if (props.editIndex !== null) {
            // Use the update function from context
            handleUpdateSubscription(props.editIndex, formData)
        } else {
            // For adding new
            handleAddSubscription(formData)
        }
            
        handleResetForm()
        closeInput()
    }

    return (
        <section>
            <h2>{props.editIndex !== null ? "Edit subscription" : "Add a new subscription"}</h2>

            <form onSubmit={handleFormSumbit}>
                <label>
                    <span>Subscription Name</span>
                    <input value={formData.name} onChange={handleChangeInput} type="text" name="name" id="subscription-name" placeholder="e.g. Netflix, Spotify, AWS Hosting" required />
                </label>

                <label>
                    <span>Category</span>
                    <select value={formData.category} onChange={handleChangeInput} name="category" id="subscription-category">
                        {['Entertainment', 'Music', 'Software', 'Web Services', 'Health & Fitness', 'Other'].map((cat, catIndex) => {
                            return (
                                <option key={catIndex}>
                                    {cat}
                                </option>
                            )
                        })}
                    </select>
                </label>


                <label>
                    <span>Cost</span>
                    <input value={formData.cost} onChange={handleChangeInput} type="number" name="cost" id="subscription-cost" step="0.01" placeholder="e.g. 12.00" required />
                </label>

                <label>
                    <span>Currency</span>
                    <select value={formData.currency} onChange={handleChangeInput} name="currency" id="subscription-currency">
                        {['USD', 'EUR', 'GBP', 'NZD', "AUD", 'Other'].map((cur, curIndex) => {
                            return (
                                <option key={curIndex}>{cur}</option>
                            )
                        })}
                    </select>
                </label>

                <label>
                    <span>Billing Frequency</span>
                    <select value={formData.billingFrequency} onChange={handleChangeInput} name="billingFrequency" id="subscription-billing-frequency">
                        {['Monthly', 'Yearly', 'Quarterly', 'One-time'].map((cur, curIndex) => {
                            return (
                                <option key={curIndex}>{cur}</option>
                            )
                        })}
                    </select>
                </label>


                <label>
                    <span>Payment Method</span>
                    <select value={formData.paymentMethod} onChange={handleChangeInput} name="paymentMethod" id="subscription-payment-method">
                        {['Credit Card', 'Debit Card', 'Paypal', 'Bank Transfer', 'Other'].map((cur, curIndex) => {
                            return (
                                <option key={curIndex}>{cur}</option>
                            )
                        })}
                    </select>
                </label>

                <label>
                    <span>Subscription Start Date</span>
                    <input value={formData.startDate} onChange={handleChangeInput} type="date" id="subscription-start-date" name="startDate" required />
                </label>

                <label>
                    <span>Status</span>
                    <select value={formData.status} onChange={handleChangeInput} name="status" id="subscription-status">
                        {['Active', 'Paused', 'Cancelled'].map((cur, curIndex) => {
                            return (
                                <option key={curIndex}>{cur}</option>
                            )
                        })}
                    </select>
                </label>


                <label className="fat-column">
                    <span>Notes</span>
                    <textarea value={formData.notes} onChange={handleChangeInput} id="subscription-notes" name="notes" placeholder="e.g. Shared with family, includes cloud storage" />
                </label>

                <div className="fat-column form-submit-btns">
                    <button type="button" onClick={closeInput}>Cancel</button>
                    <button type="submit">
                        {props.editIndex !== null ? "Update Subscription" : "Add Subscription"}
                    </button>
                </div>
            </form>
        </section>
    )
}