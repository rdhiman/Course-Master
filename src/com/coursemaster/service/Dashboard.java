package com.coursemaster.service;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.coursemaster.auth.Session;
import com.coursemaster.servlet.util.FileUtil;

public class Dashboard extends AbstractService {

    @Override
    public void doRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        /// Open the template file
        String dashboardAsString = FileUtil.loadTemplateFile("dashboard.tpl");

        Session session = (Session) request.getAttribute("session");

        // Replace dashboard content with specified user's content
        dashboardAsString = dashboardAsString.replace("##USERNAME##", session.getUsername());

        response.getWriter().write(dashboardAsString);
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
